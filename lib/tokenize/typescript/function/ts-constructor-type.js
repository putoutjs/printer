'use strict';

const {printParams} = require('../../expressions/function/params');
const {printReturnType} = require('./print-return-type');

module.exports.TSConstructorType = (path, printer, semantics) => {
    const {print} = printer;
    
    print('new');
    print(' ');
    
    printParams(path, printer, semantics);
    print.space();
    print('=>');
    print.space();
    printReturnType(path, printer);
};
