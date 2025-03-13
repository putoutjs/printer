'use strict';

const {types} = require('@putout/babel');
const {
    isArrayExpression,
    isCallExpression,
    isIdentifier,
} = types;

module.exports.isThirdObjectInsideArray = (path) => {
    const {parentPath} = path;
    
    if (!isArrayExpression(parentPath))
        return false;
    
    const [, second, third] = parentPath.node.elements;
    
    return isCallExpression(second) && !!isIdentifier(second);
};

