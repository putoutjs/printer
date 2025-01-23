'use strict';

const {types} = require('@putout/babel');
const {
    isExpressionStatement,
    isFunction,
    isAssignmentExpression,
} = types;

module.exports.isInsideAssignNextAssignFunction = (path) => {
    const {expression} = path.node;
    
    if (!isAssignmentExpression(expression))
        return false;
    
    const next = path.getNextSibling();
    
    if (isFunction(next) && next.node.leadingComments)
        return true;
    
    if (!isExpressionStatement(next))
        return false;
    
    const {leadingComments} = next.node;
    
    if (!leadingComments)
        return false;
    
    if (!isAssignmentExpression(next.node.expression))
        return false;
    
    return isFunction(next.node.expression.right);
};
