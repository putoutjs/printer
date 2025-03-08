'use strict';

const {types} = require('@putout/babel');
const {
    isArrayExpression,
    isCallExpression,
} = types;

module.exports.isThirdObjectInsideArray = (path) => {
    const {parentPath} = path;
    
    if (!isArrayExpression(parentPath))
        return false;
    
    const [, second, third] = parentPath.node.elements;
    
    if (!isCallExpression(second))
        return false;
    
    return third === path.node;
};
