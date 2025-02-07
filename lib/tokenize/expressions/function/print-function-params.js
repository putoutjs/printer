'use strict';

const {printParams} = require('./params');

const hasDecorators = ({decorators}) => decorators?.length;

module.exports.printFunctionParams = (path, printer, semantics) => {
    const {print} = printer;
    const {params} = path.node;
    const isNewline = params.filter(hasDecorators).length;
    const printSpace = isNewline ? print.breakline : print.space;
    
    const printBeforeFirst = createPrint({
        type: 'inc',
        printer,
        isNewline,
    });
    
    const printAfterLast = createPrint({
        type: 'dec',
        printer,
        isNewline,
    });
    
    printParams(path, printer, semantics, {
        printBeforeFirst,
        printSpace,
        printAfterLast,
    });
};

const createPrint = ({isNewline, printer, type}) => () => {
    if (!isNewline)
        return;
    
    const {indent, print} = printer;
    indent[type]();
    print.breakline();
};
