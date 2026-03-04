import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {
    isNext,
    isInsideProgram,
    isLast,
    exists,
    satisfy,
    isInsideBlock,
} from '#is';
import {insideIfWithNoBody} from './inside-if-with-no-body.js';

const parentIfWithoutElse = ({parentPath}) => {
    if (!parentPath.isIfStatement())
        return false;
    
    return !parentPath.node.alternate;
};

const {
    isFunctionDeclaration,
    isExportDeclaration,
    isDoWhileStatement,
} = types;

const isTopLevelWithNoNext = (path) => {
    if (isNext(path))
        return false;
    
    return !isNext(path.parentPath) && isInsideProgram(path.parentPath);
};

const isInsideDoWhile = ({parentPath}) => isDoWhileStatement(parentPath);
const isMethodOrArrow = createTypeChecker([
    'ArrowFunctionExpression',
    'ObjectMethod',
]);
const isInsideFn = (path) => path.find(isMethodOrArrow);

const isInsideIfWithoutElseInsideFn = createTypeChecker([
    ['-: -> !', parentIfWithoutElse],
    ['+', isInsideFn],
]);

const isEmptyBodyNoNext = (path) => {
    const {parentPath} = path;
    return parentPath.isStatement() && !path.node.body.length && !isNext(parentPath);
};

const isLooksLikeInsideFn = ({parentPath}) => {
    return /FunctionExpression/.test(parentPath.type);
};

const isNoNewline = satisfy([
    isInsideDoWhile,
    isTopLevelWithNoNext,
    insideIfWithNoBody,
]);

export const shouldAddNewlineAfter = createTypeChecker([
    ['+', isInsideBlock],
    ['-', isNoNewline],
    ['+', isInsideIfWithoutElseInsideFn],
    ['-', isEmptyBodyNoNext],
    ['-', isTry],
    ['-', isLooksLikeInsideFn],
    ['-', isLast],
    ['-', isExportFunction],
    ['+: -> !', isNextIfAlternate],
]);

function isExportFunction(path) {
    if (!isFunctionDeclaration(path.parentPath))
        return false;
    
    if (!isExportDeclaration(path.parentPath?.parentPath))
        return false;
    
    return !isNext(path.parentPath?.parentPath);
}

function isNextIfAlternate(path) {
    const {parentPath} = path;
    
    if (!parentPath.isIfStatement())
        return false;
    
    const alternate = parentPath.get('alternate');
    
    if (path === alternate)
        return false;
    
    return exists(alternate);
}

function isTry({parentPath}) {
    if (parentPath.isTryStatement())
        return true;
    
    return parentPath.parentPath?.isTryStatement();
}
