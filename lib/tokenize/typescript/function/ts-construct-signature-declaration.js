'use strict';

const {printParams} = require('../../expressions/function/params');
const {exists} = require('../../is');
const {
    hasReturnType,
    printReturnType,
} = require('./print-return-type');

module.exports.TSConstructSignatureDeclaration = (path, printer, semantics) => {
    const {write, traverse} = printer;
    
    write('new');
    printParams(path, printer, semantics);
    
    if (hasReturnType(path)) {
        write(':');
        write.space();
        printReturnType(path, printer);
    }
};

