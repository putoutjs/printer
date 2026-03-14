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

export const isNewlineAfterSemicolon = createTypeChecker([
    ['+: parentPath -> SwitchCase'],
    ['-: -> !', isInsideParentLike],
    ['-: -> !', isNext],
    ['+', noTrailingComment],
    ['+', isNewlineBetweenSiblings],
]);

export const isNeedBreaklineAfterComma = (path, {maxVariablesInOneLine}) => {
    const {length} = path.node.declarations;
    return length > maxVariablesInOneLine;
};

export const isNeedSpaceAfterComma = (path, {maxVariablesInOneLine}) => {
    const {length} = path.node.declarations;
    return length <= maxVariablesInOneLine;
};
