'use strict';

const {types} = require('@putout/babel');
const {
    isArrayExpression,
    isCallExpression,
    isIdentifier,
} = types;

module.exports.isThirdObjectInsideArray = ({parentPath}) => {
    if (!isArrayExpression(parentPath))
        return false;
    
    const [, second] = parentPath.node.elements;
    
    return isCallExpression(second) && !!isIdentifier(second);
};
