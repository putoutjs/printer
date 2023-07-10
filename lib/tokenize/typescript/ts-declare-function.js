'use strict';

const {printParams} = require('../expressions/functions/params');
const {isNext} = require('../is');

const notInsideExport = (path) => !path.parentPath.isExportDeclaration();

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
    maybe.print(notInsideExport(path), ';');
    maybe.print.newline(isNext(path));
};
