'use strict';

module.exports.ExportDefaultDeclaration = {
    /*
    beforeIf(path) {
        return path.getPrevSibling().isTSTypeAliasDeclaration();
    },
    before(path, {print}) {
        print.breakline();
    },
     */print(path, {print, traverse, maybe}) {
        const declaration = path.get('declaration');
        print('export default ');
        traverse(declaration);
        maybe.print(!declaration.isClassDeclaration(), ';');
    },
};
