'use strict';

const {condition} = require('./maybe-parens-condition');

const {
    printLeadingCommentLine,
    maybeInsideReturnWithCommentEnd,
    maybeInsideReturnWithCommentStart,
} = require('./assignment-expression-comments');

const {maybeParens} = require('../../maybe/maybe-parens');
const {printSeparator} = require('./print-separator');

const isInsideBlock = ({parentPath}) => /BlockStatement|Program/.test(parentPath.type);

module.exports.AssignmentExpression = maybeParens({
    checkParens: false,
    condition,
    print(path, printer) {
        const {print} = printer;
        const {operator} = path.node;
        
        maybeInsideReturnWithCommentStart(path, printer);
        
        print('__left');
        print.space();
        print(operator);
        printSeparator(path, printer);
        print('__right');
        
        if (isInsideBlock(path)) {
            print(';');
            print.breakline();
        }
        
        maybeInsideReturnWithCommentEnd(path, printer);
    },
});

module.exports.AssignmentExpression.printLeadingCommentLine = printLeadingCommentLine;
