import {
    isLast,
    noTrailingComment,
} from '#is';
import {createTypeChecker} from '#type-checker';

const isInsideIfWithElse = createTypeChecker([
    ['-: parentPath -> !IfStatement'],
    ['+: parentPath.node.alternate', Boolean],
]);

export const afterIf = createTypeChecker([
    ['+', isInsideIfWithElse],
    ['-', isLast],
    ['-: parentPath', isLast],
    ['+', noTrailingComment],
]);
