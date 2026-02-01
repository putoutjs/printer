import {types} from '@putout/babel';
import {isCoupleLines, exists} from '#is';
import {hasAssign} from './has.js';

const {
    isObjectExpression,
    isAssignmentPattern,
    isForOfStatement,
    isFunction,
    isVariableDeclarator,
    isObjectProperty,
} = types;

export const isInsideFn = (path) => {
    if (isFunction(path.parentPath))
        return true;
    
    return isFunction(path.parentPath.parentPath);
};

export function isIndent(path) {
    return !path.parentPath.isArrayPattern();
}

export const isCoupleProperties = ({path, valuePath, property}) => {
    if (!isCoupleLines(valuePath))
        return false;
    
    if (exists(property.getPrevSibling()))
        return false;
    
    const properties = path.get('properties');
    const {parentPath} = path;
    
    if (isVariableDeclarator(parentPath) && !hasAssign(properties))
        return false;
    
    return !isObjectProperty(parentPath);
};

export function isInsideForOf({parentPath}) {
    return isForOfStatement(parentPath.parentPath.parentPath);
}

export function isPrevAssign(path) {
    const prev = path.getPrevSibling();
    
    return isAssignmentPattern(prev.node.value);
}

export function isPrevAssignObject(path) {
    const prev = path.getPrevSibling();
    
    if (!isAssignmentPattern(prev.node.value))
        return false;
    
    const {right} = prev.node.value;
    
    return isObjectExpression(right);
}

export function isNextAssignObject(path) {
    const next = path.getNextSibling();
    
    if (!next.node)
        return false;
    
    if (!isAssignmentPattern(next.node.value))
        return false;
    
    const {right} = next.node.value;
    
    return isObjectExpression(right);
}
