'use strict';

const {types} = require('@putout/babel');
const {isArrayExpression} = types;

const TYPES = [
    'NullLiteral',
    'NumericLiteral',
    'BigIntLiteral',
];

module.exports.isInsideTuple = (path) => {
    const {parentPath} = path;
    
    if (!isArrayExpression(parentPath))
        return false;
    
    const [first, second] = parentPath.node.elements;
    
    if (second !== path.node)
        return false;
    
    return TYPES.includes(first.type);
};
