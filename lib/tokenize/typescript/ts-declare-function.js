'use strict';

const {printParams} = require('../expressions/functions/params');
const {isNext} = require('../is');

const isInsideExport = (path) => {
    return path.parentPath.isExportDefaultDeclaration();
};

module.exports.TSDeclareFunction = (path, printer, semantics) => {
    const {print, maybe} = printer;
    const {declare} = path.node;
    
    maybe.print(declare, 'declare ');
    print('function ');
    print('__id');
    
    printParams(path, printer, semantics);
    
    print(':');
    print.space();
    print('__returnType');
    
    if (!isInsideExport(path)) {
        print(';');
        maybe.print.newline(isNext(path) || isNext(path.parentPath));
    }
};
