'use strict';

const {printParams} = require('../../expressions/function/params');
const {isNext} = require('../../is');

const isInsideExport = (path) => {
    return path.parentPath.isExportDefaultDeclaration();
};

module.exports.TSDeclareFunction = (path, printer, semantics) => {
    const {
        print,
        maybe,
        indent,
    } = printer;
    
    const {declare} = path.node;
    
    indent();
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
