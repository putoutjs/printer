import {createTypeChecker} from '#type-checker';
import {
    isInsideFn,
    isPrevAssignObject,
} from './is.js';

const hasOptionIs = (a, {is}) => is;

export const isIndentBeforeProperty = createTypeChecker([
    ['-', isInsideFn],
    ['+', isPrevAssignObject],
    ['+', hasOptionIs],
]);
