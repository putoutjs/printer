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

const isTwoLinesDifferenceWithPrev = (path) => {
    const prev = path.getPrevSibling();
    
    return path.node.loc?.start.line === prev.node?.loc?.start?.line + 2;
};

const {
    isIfStatement,
    isFunctionDeclaration,
    isVariableDeclaration,
} = types;

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

const isNextAssign = (path) => {
    const nextPath = path.getNextSibling();
    
    if (!nextPath.isExpressionStatement())
        return false;
    
    const {parentPath} = path;
    
    if (parentPath.isBlockStatement() && parentPath.node.body.length < 3)
        return false;
    
    return nextPath.get('expression').isAssignmentExpression();
};

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

function notLastPrevVarNotNextVar(path) {
    const prev = path.getPrevSibling();
    const next = path.getNextSibling();
    
    if (!exists(prev.getPrevSibling()))
        return false;
    
    if (path.node.loc?.start.line === prev.node?.loc?.start.line + 2)
        return false;
    
    return !isLast(path) && prev.isVariableDeclaration() && !next.isVariableDeclaration();
}
