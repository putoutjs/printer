import {createTypeChecker} from '#type-checker';
import {
    isCoupleLines,
    exists,
    callWithPrev,
    callWithNext,
} from '#is';
import {hasAssign} from './has.js';

export const hasOptionIs = (a, {is}) => is;

export const isInsideFn = createTypeChecker([
    '+: parentPath -> FunctionDeclaration',
    '+: parentPath.parentPath -> FunctionDeclaration',
]);

export const isInsideArrayPattern = createTypeChecker([
    '-: parentPath -> ArrayPattern',
    '+: parentPath.parentPath -> !ArrayPattern',
]);

const callWithValue = (fn) => (path) => fn(path.get('value'));

const isVarWithAssign = createTypeChecker([
    ['-: parentPath.parentPath -> !VariableDeclarator'],
    ['+: parentPath -> !', hasAssign],
]);

export const hasCoupleProperties = createTypeChecker([
    ['-: -> !', callWithValue(isCoupleLines)],
    ['-', callWithPrev(exists)],
    ['-', isVarWithAssign],
    ['+: parentPath.parentPath -> !ObjectProperty'],
]);

export const isAssignObject = createTypeChecker([
    '-: node.value -> !AssignmentPattern',
    '+: node.value.right -> ObjectExpression',
]);

export const isPrevAssignObject = callWithPrev(isAssignObject);
export const isNextAssignObject = callWithNext(isAssignObject);
