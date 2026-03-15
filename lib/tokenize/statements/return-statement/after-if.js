import {
    isLast,
    noTrailingComment,
} from '#is';
import {createTypeChecker} from '#type-checker';

const isInsideIfWithElse = createTypeChecker([
    '-: parentPath -> !IfStatement',
    '+: parentPath.node.alternate -> +',
]);

export const afterIf = createTypeChecker([
    ['+', isInsideIfWithElse],
    ['-', isLast],
    ['-: parentPath', isLast],
    ['+', noTrailingComment],
]);
