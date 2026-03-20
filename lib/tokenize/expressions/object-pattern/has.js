import {types} from '@putout/babel';

const {
    isAssignmentPattern,
    isObjectPattern,
    isObjectExpression,
} = types;

export function hasObjectPattern(properties) {
    for (const property of properties) {
        if (isObjectPattern(property.node.value))
            return true;
    }
    
    return false;
}

export function hasAssign(properties) {
    for (const prop of properties) {
        const {value} = prop.node;
        
        if (isAssignmentPattern(value))
            return true;
    }
    
    return false;
}

export function hasAssignObject(path, maxPropertiesLengthInOneLine) {
    const properties = path.get('properties');
    const n = properties.length;
    
    for (const prop of properties) {
        const {value} = prop.node;
        
        if (isAssignmentPattern(value) && isObjectExpression(value.right))
            return n > 1 || maxPropertiesLengthInOneLine <= value.left;
    }
    
    return false;
}
