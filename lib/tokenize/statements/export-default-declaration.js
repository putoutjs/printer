'use strict';

const {isNext} = require('../is');

const notClass = (path) => {
    if (!isNext(path))
        return false;
    
    return !path.get('declaration').isClass();
};

module.exports.ExportDefaultDeclaration = {
    print(path, {print, traverse, maybe}) {
        const declaration = path.get('declaration');
        print('export default ');
        traverse(declaration);
        maybe.print(!declaration.isClassDeclaration(), ';');
    },
    afterSatisfy: () => [
        notClass,
    ],
    after(path, {print}) {
        print.newline();
        print.newline();
    },
};
