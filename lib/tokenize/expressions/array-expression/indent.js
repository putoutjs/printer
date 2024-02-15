'use strict';

const {types} = require('@putout/babel');
const {isIndented} = require('../../is');

const {
    isStringLiteral,
    isArrayExpression,
} = types;

const isInsideArray = (path) => path.parentPath.isArrayExpression();

module.exports.isInsideArray = isInsideArray;

module.exports.isArrayIndented = (path) => {
    const elements = path.get('elements');
    
    if (isArrayInsideArray(path))
        return false;
    
    const [first] = elements;
    
    return !isTwoLongStrings(elements) || !isInsideArray(path) && isIndented(first);
};

module.exports.isArrayInsideArray = isArrayInsideArray;

function isArrayInsideArray(path) {
    if (!path.isArrayExpression() || !path.parentPath.isArrayExpression())
        return false;
    
    const parentElements = path.parentPath.node.elements;
    const parentHasArrays = parentElements.filter(isArrayExpression).length;
    const lastIsArray = !isArrayExpression(parentElements.at(-1));
    
    if (parentHasArrays && lastIsArray)
        return false;
    
    return parentElements.length <= 3;
}

const isTwoLongStrings = ([a, b]) => {
    const LONG_STRING = 20;
    
    if (!isStringLiteral(a) || !isStringLiteral(b))
        return false;
    
    return a.node.value.length > LONG_STRING;
};
