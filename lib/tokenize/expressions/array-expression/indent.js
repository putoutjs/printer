'use strict';

const {types} = require('@putout/babel');
const {isStringLiteral} = types;

const {isIndented} = require('../../is');

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
    
    return path.parentPath.node.elements.length <= 3;
}

const isTwoLongStrings = ([a, b]) => {
    const LONG_STRING = 20;
    
    if (!isStringLiteral(a) || !isStringLiteral(b))
        return false;
    
    return a.node.value.length > LONG_STRING;
};
