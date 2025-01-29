'use strict';

const {types} = require('@putout/babel');
const {
    isNext,
    isParentProgram,
    isLast,
    exists,
    satisfy,
} = require('../../is');

const {markAfter} = require('../../mark');
const {parseComments} = require('../../comment/comment');
const {insideIfWithNoBody} = require('./inside-if-with-no-body');
const {getDirectives} = require('./get-directives');

const {isCallInsideChain} = require('./is-call-inside-chain');
const {
    isArrowFunctionExpression,
    isObjectMethod,
    isFunctionDeclaration,
    isExportDeclaration,
    isDoWhileStatement,
    isBlockStatement,
} = types;

const isFirstStatement = (path) => path.node.body[0];
const isFirstDirective = (path) => path.node.directives?.[0];
const isMethodOrArrow = (path) => isArrowFunctionExpression(path) || isObjectMethod(path);

const parentIfWithoutElse = ({parentPath}) => {
    if (!parentPath.isIfStatement())
        return false;
    
    return !parentPath.node.alternate;
};

module.exports.BlockStatement = {
    print(path, printer, semantics) {
        const {
            indent,
            maybe,
            write,
            traverse,
        } = printer;
        
        const body = path.get('body');
        const directives = getDirectives(path);
        
        if (path.parentPath.isBlockStatement())
            indent();
        
        indent.inc();
        write('{');
        
        if (isFirstStatement(path) || isFirstDirective(path))
            write.newline();
        
        for (const directive of directives) {
            traverse(directive);
        }
        
        maybe.write.linebreak(directives.length && body.length);
        const callInsideChain = isCallInsideChain(path);
        
        maybe.indent.inc(callInsideChain);
        
        for (const element of body) {
            traverse(element);
        }
        
        parseComments(path, printer, semantics);
        
        indent.dec();
        maybe.indent(body.length);
        write('}');
        
        maybe.indent.dec(callInsideChain);
        
        if (path.parentPath.isObjectMethod())
            write(',');
    },
    afterIf: shouldAddNewlineAfter,
    after(path, {write}) {
        write.newline();
        markAfter(path.parentPath);
    },
};

const isTopLevelWithNoNext = (path) => {
    if (isNext(path))
        return false;
    
    return !isNext(path.parentPath) && isParentProgram(path.parentPath);
};

const isInsideIfWithoutElseInsideFn = (path) => {
    return parentIfWithoutElse(path) && path.find(isMethodOrArrow);
};

const isEmptyBodyNoNext = (path) => {
    const {parentPath} = path;
    return parentPath.isStatement() && !path.node.body.length && !isNext(parentPath);
};

const isLooksLikeInsideFn = ({parentPath}) => {
    return /FunctionExpression/.test(parentPath.type);
};

const NEWLINE = true;
const NO_NEWLINE = false;

const isInsideDoWhile = ({parentPath}) => isDoWhileStatement(parentPath);
const isInsideBlock = ({parentPath}) => isBlockStatement(parentPath);

const isNoNewline = satisfy([
    isInsideDoWhile,
    isTopLevelWithNoNext,
    insideIfWithNoBody,
]);

function shouldAddNewlineAfter(path) {
    if (isInsideBlock(path))
        return NEWLINE;
    
    if (isNoNewline(path))
        return NO_NEWLINE;
    
    if (isInsideIfWithoutElseInsideFn(path))
        return NEWLINE;
    
    if (isEmptyBodyNoNext(path))
        return NO_NEWLINE;
    
    if (isTry(path))
        return NO_NEWLINE;
    
    if (isLooksLikeInsideFn(path))
        return NO_NEWLINE;
    
    if (isLast(path))
        return NO_NEWLINE;
    
    if (isExportFunction(path))
        return NO_NEWLINE;
    
    return !isNextIfAlternate(path);
}

// export function a() {}
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
