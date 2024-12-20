'use strict';

const {types} = require('@putout/babel');
const {
    maybePrintLeftBrace,
    maybePrintRightBrace,
} = require('./maybe-write-brace');

const {
    isExpressionStatement,
    isAssignmentExpression,
} = types;

module.exports.AssignmentExpression = (path, printer, semantics) => {
    const {print} = printer;
    const {operator} = path.node;
    
    maybePrintLeftBrace(path, printer, semantics);
    print('__left');
    print.space();
    print(operator);
    
    if (isMultiline(path))
        print.breakline();
    else
        print.space();
    
    print('__right');
    maybePrintRightBrace(path, printer, semantics);
};

function isMultiline(path) {
    const {right} = path.node;
    
    if (!path.parentPath.find(isExpressionStatement))
        return false;
    
    return isAssignmentExpression(right);
}
