'use strict';

const {
    isCoupleLines,
    isForOf,
    isIf,
    noTrailingComment,
    isNewlineBetweenSiblings,
    noLeadingComment,
    hasLeadingComment,
    exists,
} = require('../../is');

const {parseComments} = require('../../comments');
const {isObjectExpression} = require('@babel/types');

const isBodyOfArrow = (path) => path.parentPath.node.body === path.node;
const isLogical = (path) => path.get('argument').isLogicalExpression();
const isValue = (path) => path.get('properties.0.value').node;
const isParentExpression = (path) => path.parentPath.isExpressionStatement();

module.exports.ObjectExpression = (path, {print, maybe, indent, write}, semantics) => {
    indent.inc();
    
    const properties = path.get('properties');
    const {length} = properties;
    const parens = isParens(path);
    const manyLines = !isOneLine(path);
    
    maybe.print(parens, '(');
    print('{');
    parseComments(path, {write}, semantics);
    maybe.print.newline(manyLines);
    
    for (const property of properties) {
        if (property.isSpreadElement()) {
            const logical = isLogical(property);
            
            maybe.indent(length > 1 || logical || manyLines);
            print(property);
            
            if (!logical && (length > 1 || manyLines)) {
                print(',');
                print.newline();
            }
            
            continue;
        }
        
        maybe.indent(manyLines && noLeadingComment(property));
        
        if (property.isObjectMethod()) {
            print(property);
            continue;
        }
        
        print(property);
        
        if (!hasNextLeadingComment(property)) {
            maybe.print.newline(manyLines && noTrailingComment(property));
            maybe.print.linebreak(isNewlineBetweenSiblings(property));
        }
    }
    
    indent.dec();
    maybe.indent(manyLines);
    print('}');
    maybe.print.newline(shouldAddNewline(path));
    maybe.print(parens, ')');
};

const hasNextLeadingComment = (path) => {
    const next = path.getNextSibling();
    
    if (!exists(next))
        return false;
    
    return hasLeadingComment(next);
};

const notLastArgInsideCall = (path) => {
    const {parentPath} = path;
    
    if (!parentPath.isCallExpression())
        return false;
    
    const {properties} = path.node;
    
    for (const property of properties) {
        if (isObjectExpression(property.value))
            return false;
    }
    
    return path !== parentPath
        .get('arguments')
        .at(-1);
};

function shouldAddNewline(path) {
    if (!path.parentPath.isLogicalExpression())
        return false;
    
    return path.parentPath.parentPath.isSpreadElement();
}

const ONE_LINE = true;
const MANY_LINES = false;

module.exports.isOneLine = isOneLine;
function isOneLine(path) {
    const {length} = path.get('properties');
    
    if (!length)
        return true;
    
    if (notLastArgInsideCall(path))
        return ONE_LINE;
    
    if (isForOf(path))
        return ONE_LINE;
    
    if (isIf(path))
        return ONE_LINE;
    
    if (isCoupleLines(path))
        return MANY_LINES;
    
    return !isValue(path);
}

function isParens(path) {
    if (isBodyOfArrow(path))
        return true;
    
    if (isParentExpression(path))
        return true;
    
    return false;
}
