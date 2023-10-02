'use strict';

const {printParams} = require('../../expressions/function/params');

const {
    hasReturnType,
    printReturnType,
} = require('./print-return-type');

module.exports.TSMethodSignature = (path, printer, semantics) => {
    const {traverse, write} = printer;
    
    traverse(path.get('key'));
    traverse(path.get('typeParameters'));
    printParams(path, printer, semantics);
    
    if (hasReturnType(path)) {
        write(':');
        write.space();
        printReturnType(path, printer);
    }
};
