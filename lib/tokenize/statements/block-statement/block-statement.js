'use strict';

const {
    isNext,
    isParentProgram,
    isLast,
    exists,
} = require('../../is');

const {
    isArrowFunctionExpression,
    isObjectMethod,
} = require('@babel/types');

const {markAfter} = require('../../mark');
const {parseComments} = require('../../comment/comment');
const {insideIfWithNoBody} = require('./inside-if-with-no-body');
const {getDirectives} = require('./get-directives');

const isFirstStatement = (path) => path.node.body[0];
const isFirstDirective = (path) => path.node.directives?.[0];
const isMethodOrArrow = (path) => isArrowFunctionExpression(path) || isObjectMethod(path);

module.exports.BlockStatement = {
    print(path, {indent, maybe, write, traverse}, semantics) {
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
        
        for (const element of body) {
            traverse(element);
        }
        
        parseComments(path, {write}, semantics);
        
        indent.dec();
        maybe.indent(body.length);
        write('}');
        
        if (path.parentPath.isObjectMethod()) {
            write(',');
        }
    },
    afterIf(path) {
        return shouldAddNewlineAfter(path);
    },
    after(path, {write}) {
        write.newline();
        markAfter(path.parentPath);
    },
};

function shouldAddNewlineAfter(path) {
    const {parentPath} = path;
    
    if (parentPath.isDoWhileStatement())
        return false;
    
    if (parentPath.isBlockStatement())
        return true;
    
    if (!isNext(path) && !isNext(path.parentPath) && isParentProgram(path.parentPath))
        return false;
    
    if (insideIfWithNoBody(path))
        return false;
    
    if (path.parentPath.isIfStatement() && path.find(isMethodOrArrow))
        return true;
    
    if (parentPath.isStatement() && !path.node.body.length && !isNext(parentPath))
        return false;
    
    if (isTry(path) || /FunctionExpression/.test(path.parentPath.type))
        return false;
    
    if (isLast(path))
        return false;
    
    return !isNextIfAlternate(path);
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
