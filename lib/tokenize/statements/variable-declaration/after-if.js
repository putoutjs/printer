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
} from '#is';

const noNextParentBlock = createTypeChecker([
    ['-', isNext],
    ['+', isInsideBlock],
]);

const {
    isIfStatement,
    isFunctionDeclaration,
} = types;

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

function isNextCoupleLines(path) {
    const next = path.getNextSibling();
    const prev = path.getPrevSibling();
    
    if (!exists(prev.getPrevSibling()) && next.isVariableDeclaration())
        return false;
    
    if (path.node.loc?.start.line === prev.node?.loc?.start?.line + 2)
        return false;
    
    return isCoupleLines(next);
}

function notLastPrevVarNotNextVar(path) {
    const prev = path.getPrevSibling();
    const next = path.getNextSibling();
    
    if (!exists(prev.getPrevSibling()))
        return false;
    
    if (path.node.loc?.start.line === prev.node?.loc?.start.line + 2)
        return false;
    
    return !isLast(path) && prev.isVariableDeclaration() && !next.isVariableDeclaration();
}
