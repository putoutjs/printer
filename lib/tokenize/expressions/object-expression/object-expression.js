'use strict';

const {types} = require('@putout/babel');
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
const {isInsideTuple} = require('./is-inside-tuple');
const {isLooksLikeChain} = require('../member-expression/is-looks-like-chain');
const {isThirdObjectInsideArray} = require('./is-third-object-inside-array');

const {
    isStringLiteral,
    isArrayExpression,
} = types;

const isBodyOfArrow = (path) => path.parentPath.node.body === path.node;
const isLogical = (path) => path.get('argument').isLogicalExpression();
const isValue = (path) => path.get('properties.0.value').node;
const isParentExpression = (path) => path.parentPath.isExpressionStatement();

const isMemberExpressionCallee = ({parentPath}) => {
    if (!parentPath.isCallExpression())
        return false;
    
    const callee = parentPath.get('callee');
    
    if (!callee.isMemberExpression())
        return false;
    
    return isLooksLikeChain(callee);
};

const isInsideCall = ({parentPath}) => parentPath.isCallExpression();

function isInsideNestedArrayCall({parentPath}) {
    if (!isArrayExpression(parentPath))
        return false;
    
    if (!isArrayExpression(parentPath.parentPath))
        return false;
    
    return isInsideCall(parentPath.parentPath);
}

function isInsideNestedTuple({parentPath}) {
    const {elements} = parentPath.parentPath.node;
    const [first] = elements;
    
    return isStringLiteral(first);
}

module.exports.ObjectExpression = (path, printer, semantics) => {
    const {trailingComma} = semantics;
    const {
        print,
        maybe,
        indent,
    } = printer;
    
    const insideNestedArrayCall = isInsideTuple(path) || isInsideNestedArrayCall(path) || isThirdObjectInsideArray(path);
    
    maybe.indent.inc(!insideNestedArrayCall);
    
    const properties = path.get('properties');
    const {length} = properties;
    const parens = isParens(path);
    const manyLines = !isOneLine(path);
    
    maybe.print(parens, '(');
    print('{');
    parseComments(path, printer, semantics);
    maybe.print.newline(manyLines);
    
    const n = properties.length - 1;
    
    const memberCallee = isMemberExpressionCallee(path);
    maybe.indent.inc(memberCallee);
    
    for (const [index, property] of properties.entries()) {
        if (property.isSpreadElement()) {
            const logical = isLogical(property);
            
            if (noLeadingComment(property))
                maybe.indent(length > 1 || logical || manyLines);
            
            print(property);
            
            if (noTrailingComment(property) && (length > 1 || manyLines)) {
                maybe.print(index !== n || trailingComma, ',');
                print.newline();
            }
            
            continue;
        }
        
        maybe.indent(manyLines && noLeadingComment(property));
        print(property);
        
        if (property.isObjectMethod())
            continue;
        
        if (noTrailingComment(property) && !hasNextLeadingComment(property)) {
            maybe.print.newline(manyLines);
            maybe.print.linebreak(isNewlineBetweenSiblings(property));
        }
    }
    
    if (!insideNestedArrayCall) {
        indent.dec();
        maybe.indent(manyLines);
    } else if (isInsideTuple(path) || isInsideNestedTuple(path)) {
        indent.dec();
        indent();
        indent.inc();
    }
    
    print('}');
    maybe.print(parens, ')');
    
    maybe.indent.dec(memberCallee);
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
    
    return path !== parentPath.get('arguments').at(-1);
};

const ONE_LINE = true;
const MANY_LINES = false;

module.exports.isOneLine = isOneLine;
function isOneLine(path) {
    const {length} = path.get('properties');
    
    if (!length)
        return ONE_LINE;
    
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
    
    return isParentExpression(path);
}
