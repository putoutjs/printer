'use strict';

const {printParams} = require('../../expressions/function/params');

const {
    hasReturnType,
    printReturnType,
} = require('./print-return-type');

module.exports.TSConstructSignatureDeclaration = (path, printer, semantics) => {
    const {write} = printer;
    
    write('new');
    printParams(path, printer, semantics);
    
    if (hasReturnType(path)) {
        write(':');
        write.space();
        printReturnType(path, printer);
    }
    
    write(';');
    write.newline();
};
