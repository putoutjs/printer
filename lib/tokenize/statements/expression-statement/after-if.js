import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {
    hasTrailingComment,
    isInsideBlock,
    isInsideReturn,
    isLast,
    isNext,
    isParentLast,
    satisfy,
    exists,
    isCoupleLines,
} from '#is';

const {
    isCallExpression,
    isAssignmentExpression,
    isArrayExpression,
    isStringLiteral,
    isTemplateLiteral,
    isExpressionStatement,
    isStatement,
} = types;

function isNotLastOrParentLast(path) {
    return !isLast(path) && !isParentLast(path);
}

const isNextUp = (path) => path.findParent(isNext);

const isTopParentLast = createTypeChecker([
    ['-: parentPath -> !IfStatement'],
    ['-: parentPath.parentPath -> !IfStatement'],
    ['-: parentPath.parentPath.parentPath -> !IfStatement'],
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
    ['-: parentPath -> !IfStatement'],
    ['-', isPathIsConsequent],
    ['+: parentPath.node.alternate -> +'],
]);

const isNextCallWithLeadingComments = (path) => {
    const next = path.getNextSibling();
    
    if (!exists(next))
        return false;
    
    if (!path.node.trailingComments)
        return false;
    
    if (isStatement(next) && isCoupleLines(path))
        return true;
    
    if (!isExpressionStatement(next))
        return false;
    
    const {expression} = path.node;
    
    if (isCallExpression(expression))
        return true;
    
    const nextExpression = next.get('expression');
    
    return isCallExpression(nextExpression);
};

function isNextWithLeadingComments(path) {
    const next = path.getNextSibling();
    const {expression} = path.node;
    
    if (!path.node.trailingComments)
        return true;
    
    if (isAssignmentExpression(expression))
        return true;
    
    return !exists(next);
}

export function isNextSimpleWithLeadingComments(path) {
    const next = path.getNextSibling();
    
    if (!hasTrailingComment(path))
        return false;
    
    if (!isExpressionStatement(next))
        return false;
    
    const {expression} = next.node;
    
    if (isStringLiteral(expression))
        return true;
    
    if (isTemplateLiteral(expression))
        return true;
    
    return isArrayExpression(next.node.expression);
}

function isAssignWithTrailingComments(path) {
    const {expression} = path.node;
    
    if (!isAssignmentExpression(expression))
        return false;
    
    return hasTrailingComment(path);
}

export const afterIf = createTypeChecker([
    ['-', isInsideReturn],
    ['-', isTopParentLast],
    ['+', isNextCallWithLeadingComments],
    ['-: -> !', isNextWithLeadingComments],
    ['+', isAssignWithTrailingComments],
    ['-: node.trailingComments.length -> +'],
    ['+', satisfyAfter],
    ['+', isBeforeElse],
]);
