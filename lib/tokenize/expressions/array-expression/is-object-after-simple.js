'use strict';

const {types} = require('@putout/babel');
const {isNextObject} = require('../../is');
const {
    isSpreadElement,
    isIdentifier,
    isArrayExpression,
    isCallExpression,
} = types;

const isPrevObject = (a) => a.getPrevSibling().isObjectExpression();
const isObjectAfterSpread = (a) => isSpreadElement(a) && isNextObject(a) && !isPrevObject(a);
const isObjectAfterIdentifier = (a) => isIdentifier(a) && isNextObject(a) && !isPrevObject(a);

const isObjectAfterArray = (a) => {
    if (!isArrayExpression(a))
        return false;
    
    return isNextObject(a);
};

const isObjectAfterCall = (a) => {
    if (!isCallExpression(a))
        return false;
    
    return isNextObject(a);
};

module.exports.isObjectAfterSimple = (a) => {
    if (isObjectAfterArray(a))
        return true;
    
    if (isObjectAfterCall(a))
        return true;
    
    return isObjectAfterSpread(a) || isObjectAfterIdentifier(a);
};
