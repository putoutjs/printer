import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {
    isCoupleLines,
    exists,
    callWithPrev,
    callWithNext,
} from '#is';
import {hasAssign} from './has.js';

const {
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

export const isNextAssignObject = callWithNext(createTypeChecker(['-: node -> -', '-: node.value -> !AssignmentPattern', '+: node.value.right -> ObjectExpression']));
