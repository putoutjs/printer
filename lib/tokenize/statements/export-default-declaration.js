'use strict';

const {isNewlineBetweenStatements} = require('../is');
const {isMarkedAfter} = require('../mark');

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
};
