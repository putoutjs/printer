'use strict';

const {types} = require('@putout/babel');
const {isNext} = require('../../is');

const {
    isVariableDeclaration,
    isFunction,
} = types;

function shouldAddSemicolon(path) {
    if (path.isClassDeclaration())
        return false;
    
    return !path.isFunctionDeclaration();
}

module.exports.ExportDefaultDeclaration = {
    print(path, {print, traverse, maybe}) {
        const declaration = path.get('declaration');
        print('export default ');
        traverse(declaration);
        maybe.print(shouldAddSemicolon(declaration), ';');
    },
    afterSatisfy: () => [isNext],
    after(path, {print, maybe}) {
        print.newline();
        maybe.print.newline(!isVarAfterFn(path));
    },
};

function isVarAfterFn(path) {
    const next = path.getNextSibling();
    
    if (!isVariableDeclaration(next))
        return false;
    
    const {declaration} = path.node;
    
    return isFunction(declaration);
}
