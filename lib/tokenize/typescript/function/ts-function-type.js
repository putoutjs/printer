'use strict';

const {printParams} = require('../../expressions/function/params');
const {printReturnType} = require('./print-return-type');

const {maybeParens} = require('../../maybe/maybe-parens');

module.exports.TSFunctionType = maybeParens((path, printer, semantics) => {
    const {print} = printer;
    
    printParams(path, printer, semantics);
    print.space();
    print('=>');
    print.space();
    printReturnType(path, printer);
});
