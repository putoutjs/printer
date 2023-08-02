'use strict';

const {printReturnType} = require('./print-return-type');
const {printParams} = require('../../expressions/functions/params');

module.exports.TSCallSignatureDeclaration = (path, printer, semantics) => {
    const {print} = printer;
    printParams(path, printer, semantics);
    print(':');
    print.space();
    printReturnType(path, printer);
};
