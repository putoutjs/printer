'use strict';

const {types} = require('@putout/babel');
const {createPrintSpace} = require('../../expressions/function/print-function-params');
const {printParams} = require('../../expressions/function/params');
const {isTSUnionType} = types;
const noop = () => {};

module.exports.TSTypeParameterDeclaration = (path, printer, semantics) => {
    const {print, indent} = printer;
    const isNewline = hasComplexParameters(path);
    const printSpace = createPrintSpace({
        isNewline,
        printer,
    });
    
    const printAfterOpen = !isNewline ? noop : () => {
        indent.inc();
        print.breakline();
    };
    
    const printAfterClose = !isNewline ? noop : () => {
        print.breakline();
    };
    
    const printBeforeClose = !isNewline ? noop : () => {
        indent.dec();
        print.breakline();
    };
    
    printParams(path, printer, semantics, {
        printSpace,
        braceOpen: '<',
        braceClose: '>',
        printAfterOpen,
        printBeforeClose,
        printAfterClose,
    });
};

function hasComplexParameters({node}) {
    const {params} = node;
    
    for (const {constraint} of params) {
        if (isTSUnionType(constraint))
            return true;
    }
    
    return false;
}
