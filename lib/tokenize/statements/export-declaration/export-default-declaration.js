'use strict';

const {isNext} = require('../../is');

const notClass = (path) => {
    if (!isNext(path))
        return false;
    
    return !path.get('declaration').isClass();
};

function shouldAddSemi(path) {
    if (path.isClassDeclaration())
        return false;
    
    if (path.isFunctionDeclaration())
        return false;
    
    return true;
}

module.exports.ExportDefaultDeclaration = {
    print(path, {print, traverse, maybe}) {
        const declaration = path.get('declaration');
        print('export default ');
        traverse(declaration);
        maybe.print(shouldAddSemi(declaration), ';');
    },
    afterSatisfy: () => [
        notClass,
    ],
    after(path, {print}) {
        print.newline();
        print.newline();
    },
};
