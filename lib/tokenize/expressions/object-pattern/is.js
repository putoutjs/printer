import {types} from '@putout/babel';
import {
    isCoupleLines,
    exists,
    callWithPrev,
} from '#is';
import {createTypeChecker} from '#type-checker';
import {hasAssign} from './has.js';

const {
    isObjectExpression,
    isAssignmentPattern,
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

export const isPrevAssignObject = callWithPrev(createTypeChecker([
    '-: node.value -> !AssignmentPattern',
    '+: node.value.right -> ObjectExpression',
]));

export function isNextAssignObject(path) {
    const next = path.getNextSibling();
    
    if (!next.node)
        return false;
    
    if (!isAssignmentPattern(next.node.value))
        return false;
    
    const {right} = next.node.value;
    
    return isObjectExpression(right);
}

