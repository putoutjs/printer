import {types} from '@putout/babel';

const {
    isAssignmentPattern,
    isObjectPattern,
    isObjectExpression,
} = types;

export function hasObjectPattern(path) {
    for (const {value} of path.node.properties) {
        if (isObjectPattern(value))
            return true;
    }
    
    return false;
}

export function hasAssign(path) {
    for (const {value} of path.node.properties) {
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
