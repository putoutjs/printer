'use strict';

const {printParams} = require('./params');
const {hasLeadingComment} = require('../../is');

const isDecoratorHasLeadingComment = (path) => {
    const [firstParam] = path.get('params');
    const decorators = firstParam.get('decorators');
    
    if (!decorators.length)
        return false;
    
    const [firstDecorator] = decorators;
    
    return hasLeadingComment(firstDecorator);
};

const hasDecorators = ({decorators}) => decorators?.length;

module.exports.printFunctionParams = (path, printer, semantics) => {
    const {print} = printer;
    const {params} = path.node;
    const isNewline = params.filter(hasDecorators).length;
    const printSpace = isNewline ? print.breakline : print.space;
    
    const printBeforeFirst = createPrint(path, {
        type: 'inc',
        printer,
        isNewline,
    });
    
    const printAfterLast = createPrint(path, {
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

const createPrint = (path, {isNewline, printer, type}) => () => {
    if (!isNewline)
        return;
    
    const {indent, print} = printer;
    
    if (!isDecoratorHasLeadingComment(path))
        indent[type]();
    
    print.breakline();
};
