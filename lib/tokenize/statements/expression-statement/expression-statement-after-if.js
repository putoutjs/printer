import {createTypeChecker} from '#type-checker';
import {
    hasTrailingComment,
    isCoupleLines,
    isInsideBlock,
    isLast,
    isNext,
    isParentLast,
    satisfy,
} from '#is';

function isNotLastOrParentLast(path) {
    return !isLast(path) && !isParentLast(path);
}

const isNextUp = (path) => path.findParent(isNext);

const isTopParentLast = createTypeChecker([
    '-: parentPath -> !IfStatement',
    '-: parentPath.parentPath -> !IfStatement',
    '-: parentPath.parentPath.parentPath -> !IfStatement',
    ['+: parentPath.parentPath.parentPath', isLast],
]);

const satisfyAfter = satisfy([
    isNotLastOrParentLast,
    isInsideBlock,
    isNext,
    isNextUp,
]);

const isPathIsConsequent = ({node, parentPath}) => node !== parentPath.node.consequent;

const isBeforeElse = createTypeChecker([
    '-: parentPath -> !IfStatement',
    ['-:', isPathIsConsequent],
    ['+: parentPath.node.alternate', Boolean],
]);

const hasTrailingCommentNotCoupleLines = createTypeChecker([
    ['-: -> !', hasTrailingComment],
    ['+: -> !', isCoupleLines],
]);

export const afterIf = createTypeChecker([
    ['-', isTopParentLast],
    ['-', hasTrailingCommentNotCoupleLines],
    ['+', satisfyAfter],
    ['+', isBeforeElse],
    ['-: -> !', hasTrailingComment],
    ['+', isLast],
]);
