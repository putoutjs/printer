import {createTypeChecker} from '#type-checker';
import {
    hasOptionIs,
    isInsideFn,
    isNextAssignObject,
    isPrevAssignObject,
} from './is.js';

export const isIndentBeforeProperty = createTypeChecker([
    ['-', isInsideFn],
    ['+', isPrevAssignObject],
    ['+', hasOptionIs],
]);

export const isIndentAfterNewline = createTypeChecker([
    ['-: node.value -> AssignmentPattern'],
    ['+', isNextAssignObject],
]);
