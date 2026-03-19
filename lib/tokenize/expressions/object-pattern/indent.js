import {createTypeChecker} from '#type-checker';
import {
    hasOptionIs,
    isInsideFn,
    isPrevAssignObject,
} from './is.js';

export const isIndentBeforeProperty = createTypeChecker([
    ['-', isInsideFn],
    ['+', isPrevAssignObject],
    ['+', hasOptionIs],
]);
