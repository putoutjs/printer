'use strict';

const {printParams} = require('../../expressions/function/params');
const {printKey} = require('../../expressions/function/kind');
const {
    hasReturnType,
    printReturnType,
} = require('./print-return-type');

module.exports.TSMethodSignature = (path, printer, semantics) => {
    const {write} = printer;
    
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
