import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {callWithNext} from '#is';
import {
    hasOptionIs,
    isNextAssignObject,
    isPrevAssignObject,
} from './is.js';

const {
    isForOfStatement,
    isAssignmentPattern,
} = types;

const isCoupleOption = (a, {couple}) => couple;

export function isInsideForOf({parentPath}) {
    return isForOfStatement(parentPath.parentPath.parentPath);
}

export function isPrevAssign(path) {
    const prev = path.getPrevSibling();
    
    return isAssignmentPattern(prev.node.value);
}

const hasNode = (path) => path.node;

export const isCommaAfterProperty = createTypeChecker([
    ['+', isCoupleOption],
    ['+', hasOptionIs],
    ['+', isNextAssignObject],
    ['+', isPrevAssignObject],
    ['+', callWithNext(hasNode)],
    ['-: key -> -'],
    ['-', isPrevAssign],
    ['-: parentPath', isInsideForOf],
    ['+: node.value.right -> ObjectExpression'],
]);

export const isNewlineAfterComma = createTypeChecker([
    ['+', isCoupleOption],
    ['-: key -> -'],
    ['-', isPrevAssign],
    ['-: parentPath', isInsideForOf],
    ['+: node.value.right -> ObjectExpression'],
]);

