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
    isVariableDeclarator,
    isObjectProperty,
} = types;

export const hasOptionIs = (a, {is}) => is;

export const isInsideFn = createTypeChecker([
    '+: parentPath -> FunctionDeclaration',
    '+: parentPath.parentPath -> FunctionDeclaration',
]);

export const isInsideArrayPattern = createTypeChecker([
    '-: parentPath -> ArrayPattern',
    '+: parentPath.parentPath -> !ArrayPattern',
]);

export const isCoupleProperties = ({path, valuePath, property}) => {
    if (!isCoupleLines(valuePath))
        return false;
    
    if (exists(property.getPrevSibling()))
        return false;
    
    const {parentPath} = path;
    
    if (isVariableDeclarator(parentPath) && !hasAssign(path))
        return false;
    
    return !isObjectProperty(parentPath);
};

export const isAssignObject = createTypeChecker([
    '-: node.value -> !AssignmentPattern',
    '+: node.value.right -> ObjectExpression',
]);

export const isPrevAssignObject = callWithPrev(isAssignObject);
export const isNextAssignObject = callWithNext(isAssignObject);
