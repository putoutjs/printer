'use strict';

const {types} = require('@putout/babel');

const {
    maybePrintLeftBrace,
    maybePrintRightBrace,
} = require('./maybe-write-brace');

const {
    printLeadingCommentLine,
    maybeInsideReturnWithCommentEnd,
    maybeInsideReturnWithCommentStart,
} = require('./assignment-expression-comments');

const {
    isExpressionStatement,
    isAssignmentExpression,
} = types;

const isInsideBlock = ({parentPath}) => /BlockStatement|Program/.test(parentPath.type);

module.exports.AssignmentExpression = (path, printer, semantics) => {
    const {print} = printer;
    const {operator} = path.node;
    
    maybePrintLeftBrace(path, printer, semantics);
    maybeInsideReturnWithCommentStart(path, printer);
    
    print('__left');
    print.space();
    print(operator);
    
    if (isMultiline(path))
        print.breakline();
    else
        print.space();
    
    print('__right');
    
    if (isInsideBlock(path)) {
        print(';');
        print.breakline();
    }
    
    maybeInsideReturnWithCommentEnd(path, printer);
    
    maybePrintRightBrace(path, printer, semantics);
};

module.exports.AssignmentExpression.printLeadingCommentLine = printLeadingCommentLine;

function isMultiline(path) {
    const {right} = path.node;
    
    if (!path.parentPath.find(isExpressionStatement))
        return false;
    
    return isAssignmentExpression(right);
}
