import {createTypeChecker} from '#type-checker';
import {
    callWithParent,
    isNewlineBetweenSiblings,
    isNext,
    noTrailingComment,
} from '#is';

export const isInsideParentLike = callWithParent(createTypeChecker([
    'Program',
    'BlockStatement',
    'ExportNamedDeclaration',
    'LabeledStatement',
]));

export const isNeedNewline = createTypeChecker([
    ['+: parentPath -> SwitchCase'],
    ['-: -> !', isInsideParentLike],
    ['-: -> !', isNext],
    ['+', noTrailingComment],
    ['+', isNewlineBetweenSiblings],
]);
