'use strict';

const {types} = require('@putout/babel');
const {
    isNumericLiteral,
    isNullLiteral,
    isArrayExpression,
} = types;

module.exports.isInsideTuple = (path) => {
    const {parentPath} = path;
    
    if (!isArrayExpression(parentPath))
        return false;
    
    const [first, second] = parentPath.node.elements;
    
    if (second !== path.node)
        return false;
    
    return isNullLiteral(first) || isNumericLiteral(first);
};
