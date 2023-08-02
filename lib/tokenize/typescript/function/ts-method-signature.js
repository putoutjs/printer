'use strict';

const {printParams} = require('../../expressions/function/params');
const {exists} = require('../../is');
const {
    hasReturnType,
    printReturnType,
} = require('./print-return-type');

module.exports.TSMethodSignature = (path, printer, semantics) => {
    const {traverse, write} = printer;
    
    traverse(path.get('key'));
    printParams(path, printer, semantics);
    
    if (hasReturnType(path)) {
        write(':');
        write.space();
        printReturnType(path, printer);
    }
};

