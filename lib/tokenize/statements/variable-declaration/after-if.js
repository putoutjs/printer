import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {
    exists,
    callWithNext,
    isCoupleLines,
    isInsideBlock,
    isLast,
    isNewlineBetweenSiblings,
    isNext,
    callWithPrev,
} from '#is';

const {
    isIfStatement,
    isFunctionDeclaration,
    isVariableDeclaration,
    isExpressionStatement,
    isAssignmentExpression,
} = types;

const issLessThenThree = (a) => a < 3;
const callWithExpression = (fn) => (path) => fn(path.node.expression);

const isTwoLinesDifferenceWithPrev = (path) => {
    const prev = path.getPrevSibling();
    return path.node.loc?.start.line === prev.node?.loc?.start?.line + 2;
};

const isInsideBlockWithLessThenThreeSiblings = createTypeChecker([
    ['-: parentPath -> !BlockStatement'],
    ['+: parentPath.node.body.length', issLessThenThree],
]);

const notLastPrevVarNotNextVar = createTypeChecker([
    ['-: -> !', callWithPrev(exists)],
    ['-', isTwoLinesDifferenceWithPrev],
    ['-', isLast],
    ['-: -> !', callWithPrev(isVariableDeclaration)],
    ['+: -> !', callWithNext(isVariableDeclaration)],
]);

const isNoPrevAndNextConst = createTypeChecker([
    ['-: ->', callWithPrev(exists)],
    ['+', callWithNext(isVariableDeclaration)],
]);

const isNextCoupleLines = createTypeChecker([
    ['-', isNoPrevAndNextConst],
    ['-', isTwoLinesDifferenceWithPrev],
    ['+', callWithNext(isCoupleLines)],
]);

const noNextParentBlock = createTypeChecker([
    ['-', isNext],
    ['+', isInsideBlock],
]);

const notLastCoupleLines = createTypeChecker([
    ['-', isLast],
    ['+', isCoupleLines],
]);

const isNextAssign = createTypeChecker([
    ['-: -> !', callWithNext(isExpressionStatement)],
    ['-', isInsideBlockWithLessThenThreeSiblings],
    ['+', callWithNext(callWithExpression(isAssignmentExpression))],
]);

export const afterIf = createTypeChecker([
    ['+', callWithNext(isIfStatement)],
    ['+', callWithNext(isFunctionDeclaration)],
    ['+', noNextParentBlock],
    ['+', notLastCoupleLines],
    ['+', isNextAssign],
    ['+', isNextCoupleLines],
    ['+', notLastPrevVarNotNextVar],
    ['+', isNewlineBetweenSiblings],
    ['+: parentPath -> ExportNamedDeclaration'],
    ['+: parentPath -> TSModuleBlock'],
]);
