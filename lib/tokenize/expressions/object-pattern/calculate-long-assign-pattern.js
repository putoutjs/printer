import {types} from '@putout/babel';

const {
    isAssignmentPattern,
    isArrayExpression,
    isObjectExpression,
    isIdentifier,
} = types;

export const calculateAssigns = (property, semantics) => {
    const currentAssign = isLongAssignPattern(property, semantics);
    
    const {right} = property.node.value;
    const isArrayOrObjectRight = isArrayExpression(right) || isComplexObject(right);
    const complexAssign = currentAssign && isArrayOrObjectRight;
    
    return {
        complexAssign,
    };
};

export function isLongAssignPattern(path, semantics) {
    const {key, value} = path.node;
    
    if (!isAssignmentPattern(value))
        return false;
    
    if (!isIdentifier(key))
        return true;
    
    const {maxPropertiesLengthInOneLine} = semantics;
    
    return key.name.length > maxPropertiesLengthInOneLine;
}

function isComplexObject(node) {
    if (!isObjectExpression(node))
        return false;
    
    return node.properties.length;
}
