'use strict';

const {types} = require('@putout/babel');
const {
    isAssignmentPattern,
    isArrayExpression,
    isObjectExpression,
} = types;

module.exports.calculateAssigns = (property, semantics) => {
    const currentAssign = isLongAssignPattern(property, semantics);
    
    const {right} = property.node.value;
    const isArrayOrObjectRight = isArrayExpression(right) || isObjectExpression(right);
    const complexAssign = currentAssign && isArrayOrObjectRight;
    
    return {
        complexAssign,
    };
};

module.exports.isLongAssignPattern = isLongAssignPattern;

function isLongAssignPattern(path, semantics) {
    if (!isAssignmentPattern(path.node.value))
        return false;
    
    const {maxPropertiesLengthInOneLine} = semantics;
    
    return path.node.key.name.length > maxPropertiesLengthInOneLine;
}
