'use strict';

const {printParams} = require('../../expressions/function/params');
const {isNext} = require('../../is');
const {maybeDeclare} = require('../../maybe/maybe-declare');

const isInsideDefaultExport = (path) => {
    return path.parentPath.isExportDefaultDeclaration();
};

const isInsideNamedExport = (path) => {
    return path.parentPath.isExportNamedDeclaration();
};

module.exports.TSDeclareFunction = {
    beforeIf: (path) => !isInsideNamedExport(path),
    before: (path, {indent}) => {
        indent();
    },
    print: maybeDeclare((path, printer, semantics) => {
        const {print} = printer;
        
        print('function ');
        print('__id');
        
        printParams(path, printer, semantics);
        
        print(':');
        print.space();
        print('__returnType');
    }),
    afterIf: (path) => !isInsideDefaultExport(path),
    after: (path, {print}) => {
        print(';');
        
        if (isNext(path) || isNext(path.parentPath) || isInsideNamedExport(path))
            print.newline();
    },
};
