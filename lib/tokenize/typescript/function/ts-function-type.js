'use strict';

const {printParams} = require('../../expressions/function/params');
const {printReturnType} = require('./print-return-type');
const {
    maybeParenOpen,
    maybeParenClose,
} = require('../../expressions/unary-expression/parens');

module.exports.TSFunctionType = (path, printer, semantics) => {
    const {print} = printer;
    
    maybeParenOpen(path, printer);
    printParams(path, printer, semantics);
    print.space();
    print('=>');
    print.space();
    printReturnType(path, printer);
    maybeParenClose(path, printer);
};
