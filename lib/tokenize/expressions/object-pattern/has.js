import {types} from '@putout/babel';
import {isAssignObject} from './is.js';

const {
    isAssignmentPattern,
    isObjectPattern,
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

export function hasAssignObject(path) {
    const properties = path.get('properties');
    const n = properties.length;
    
    for (const prop of properties) {
        if (isAssignObject(prop))
            return n > 1;
    }
    
    return false;
}
