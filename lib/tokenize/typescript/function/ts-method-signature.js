'use strict';

const {printParams} = require('../../expressions/function/params');
const {printKind} = require('../../expressions/function/kind');
const {
    hasReturnType,
    printReturnType,
} = require('./print-return-type');

const {printKey} = require('../../expressions/object-expression/print-key');

module.exports.TSMethodSignature = (path, printer, semantics) => {
    const {write} = printer;
    
    printKind(path, printer);
    printKey(path, printer);
    printParams(path, printer, semantics);
    
    if (hasReturnType(path)) {
        write(':');
        write.space();
        printReturnType(path, printer);
    }
    
    write(';');
    write.newline();
};
