import {types} from '@putout/babel';
import {createPrintSpace} from '../../expressions/function/print-function-params.js';
import {printParams} from '../../expressions/function/params.js';

const {isTSUnionType} = types;
const noop = () => {};

export const TSTypeParameterDeclaration = (path, printer, semantics) => {
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
