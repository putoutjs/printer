'use strict';

const {isNext} = require('../../is');

function shouldAddSemi(path) {
    if (path.isClassDeclaration())
        return false;
    
    return !path.isFunctionDeclaration();
}

module.exports.ExportDefaultDeclaration = {
    print(path, {print, traverse, maybe}) {
        const declaration = path.get('declaration');
        print('export default ');
        traverse(declaration);
        maybe.print(shouldAddSemi(declaration), ';');
    },
    afterSatisfy: () => [isNext],
    after(path, {print}) {
        print.newline();
        print.newline();
    },
};
