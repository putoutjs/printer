'use strict';

const {
    isNewlineBetweenStatements,
    isNext,
} = require('../is');

const {isMarkedAfter} = require('../mark');

const notClass = (path) => {
    if (!isNext(path))
        return false;
    
    return !path.get('declaration').isClass();
};

module.exports.ExportDefaultDeclaration = {
    beforeIf(path) {
        const prev = path.getPrevSibling();
        
        if (isMarkedAfter(prev))
            return false;
        
        return isNewlineBetweenStatements(prev);
    },
    before(path, {print}) {
        print.newline();
    },
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
