import {createTypeChecker} from '#type-checker';
import {
    callWithNext,
    hasLeadingComment,
    isNewlineBetweenSiblings,
} from '#is';

export const isLinebreakAfterProperty = createTypeChecker([
    ['-: -> SpreadElement'],
    ['-', callWithNext(hasLeadingComment)],
    ['+', isNewlineBetweenSiblings],
]);
