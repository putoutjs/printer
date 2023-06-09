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

const {parseComments} = require('../../comment/comment');
const {isSpreadElement} = require('@babel/types');

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
            
            if (length > 1 || manyLines) {
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
    
    if (isCoupleLines(path))
        return false;
    
    return path !== parentPath
        .get('arguments')
        .at(-1);
};

const ONE_LINE = true;
const MANY_LINES = false;

const isSpreadFirst = (path) => {
    const {properties} = path.node;
    const {length} = properties;
    
    return length > 1 && isSpreadElement(properties[0]);
};

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
    
    if (isSpreadFirst(path))
        return MANY_LINES;
    
    return !isValue(path);
}

function isParens(path) {
    if (isBodyOfArrow(path))
        return true;
    
    return isParentExpression(path);
}
