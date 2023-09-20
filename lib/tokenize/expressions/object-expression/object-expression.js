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
const {likeChain} = require('../member-expression/member-expressions');
const {maybeParens} = require('../function/parens');

const isLogical = (path) => path.get('argument').isLogicalExpression();
const isValue = (path) => path.get('properties.0.value').node;

const isMemberExpressionCallee = ({parentPath}) => {
    if (!parentPath.isCallExpression())
        return false;
    
    const callee = parentPath.get('callee');
    
    if (!callee.isMemberExpression())
        return false;
    
    return likeChain(callee);
};

module.exports.ObjectExpression = maybeParens((path, {print, maybe, indent, write}, semantics) => {
    const {trailingComma} = semantics;
    indent.inc();
    
    const properties = path.get('properties');
    const {length} = properties;
    const manyLines = !isOneLine(path);
    
    maybe.print(path.isRecordExpression(), '#');
    
    print('{');
    parseComments(path, {write}, semantics);
    maybe.print.newline(manyLines);
    
    const n = properties.length - 1;
    
    maybe.indent.inc(isMemberExpressionCallee(path));
    
    for (const [index, property] of properties.entries()) {
        if (property.isSpreadElement()) {
            const logical = isLogical(property);
            
            maybe.indent(length > 1 || logical || manyLines);
            print(property);
            
            if (length > 1 || manyLines) {
                maybe.print(index !== n || trailingComma, ',');
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
    
    maybe.indent.dec(isMemberExpressionCallee(path));
});

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
