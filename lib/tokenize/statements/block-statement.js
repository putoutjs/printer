'use strict';

const {
    isNext,
    isParentProgram,
    isLast,
    exists,
} = require('../is');

const {
    isArrowFunctionExpression,
    isObjectMethod,
} = require('@babel/types');

const {markAfter} = require('../mark');
const {parseComments} = require('../comments');

const isFirstStatement = (path) => path.get('body.0')?.isStatement();
const isMethodOrArrow = (path) => isArrowFunctionExpression(path) || isObjectMethod(path);

module.exports.BlockStatement = {
    print(path, {indent, maybe, print, write}) {
        const body = path.get('body');
        
        if (path.parentPath.isBlockStatement())
            indent();
        
        indent.inc();
        print('{');
        
        if (isFirstStatement(path))
            print.newline();
        
        for (const element of body) {
            print(element);
        }
        
        parseComments(path, {write});
        
        indent.dec();
        maybe.indent(body.length);
        print('}');
        
        if (path.parentPath.isObjectMethod()) {
            print(',');
        }
    },
    afterIf(path) {
        return shouldAddNewlineAfter(path);
    },
    after(path, {print}) {
        print.newline();
        markAfter(path.parentPath);
    },
};

function shouldAddNewlineAfter(path) {
    const {parentPath} = path;
    
    if (!isNext(path) && !isNext(path.parentPath) && isParentProgram(path.parentPath))
        return false;
    
    if (path.parentPath.isIfStatement() && path.find(isMethodOrArrow))
        return true;
    
    if (parentPath.isStatement() && !path.node.body.length && !isNext(parentPath))
        return false;
    
    if (isTry(path) || /FunctionExpression/.test(path.parentPath.type))
        return false;
    
    if (isLast(path))
        return false;
    
    if (isNextIfAlternate(path))
        return false;
    
    return true;
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
    
    if (parentPath.parentPath?.isTryStatement())
        return true;
    
    return false;
}

