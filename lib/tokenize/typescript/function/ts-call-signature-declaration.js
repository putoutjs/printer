'use strict';

const {printReturnType} = require('./print-return-type');
const {printParams} = require('../../expressions/function/params');

module.exports.TSCallSignatureDeclaration = (path, printer, semantics) => {
    const {print} = printer;
    printParams(path, printer, semantics);
    print(':');
    print.space();
    printReturnType(path, printer);
    print(';');
    print.newline();
};
