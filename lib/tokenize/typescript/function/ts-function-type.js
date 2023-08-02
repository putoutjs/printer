'use strict';

const {printParams} = require('../../expressions/functions/params');
const {printReturnType} = require('./print-return-type');

module.exports.TSFunctionType = (path, printer, semantics) => {
    const {print} = printer;
    
    printParams(path, printer, semantics);
    print.space();
    print('=>');
    print.space();
    printReturnType(path, printer);
};
