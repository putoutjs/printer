import {createTypeChecker} from '#type-checker';
import {
    callWithNext,
    hasLeadingComment,
} from '#is';
import {isMultilineOption} from '../array-expression/is.js';

export const isNewlineAfterProperty = createTypeChecker([
    ['-: -> !', isMultilineOption],
    ['+: -> SpreadElement'],
    ['+: -> !', callWithNext(hasLeadingComment)],
]);
