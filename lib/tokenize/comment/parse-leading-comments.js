'use strict';

const {types} = require('@putout/babel');
const {
    hasTrailingComment,
    satisfy,
    isPrev,
} = require('../is');

const {markBefore} = require('../mark');
const {maybeInsideFn} = require('./maybe-inside-fn');

const {
    hasCommentsPrinter,
    printComments,
} = require('./comments-printer/comments-printer');

const {
    isArrowFunctionExpression,
    isObjectProperty,
    isVariableDeclarator,
    isClassProperty,
    isTSPropertySignature,
    isSpreadElement,
    isClassBody,
    isBinaryExpression,
    isClassMethod,
    isDecorator,
} = types;

const isProperty = satisfy([
    isObjectProperty,
    isVariableDeclarator,
    isClassProperty,
    isTSPropertySignature,
    isSpreadElement,
]);

const isInsideVar = (path) => {
    const {parentPath} = path;
    
    if (isVariableDeclarator(parentPath) && path === parentPath.get('init'))
        return true;
    
    if (!isArrowFunctionExpression(parentPath))
        return false;
    
    return isVariableDeclarator(parentPath.parentPath);
};

const hasDecoratorsWithComments = (path) => {
    if (isDecorator(path))
        return false;
    
    return path?.parentPath.node?.decorators;
};

function isCommentOfPrevious(path) {
    const [comment] = path.node.leadingComments;
    const {line} = comment.loc.start;
    
    return path.getPrevSibling().node?.loc.start.line === line;
}

function isCommentOnPreviousLine(path) {
    const {
        loc,
        leadingComments,
    } = path.node;
    
    if (!isProperty(path))
        return false;
    
    const [comment] = leadingComments;
    const {line} = comment.loc.start;
    
    if (isCommentOfPrevious(path))
        return false;
    
    return line <= loc.start.line - 1;
}

const isFirst = (path) => {
    const {parentPath} = path;
    
    if (path === parentPath.get('properties')[0])
        return true;
    
    if (isClassBody(parentPath) && isClassProperty(path))
        return path === parentPath.get('body')[0];
    
    return false;
};

module.exports.parseLeadingComments = (path, printer, semantics, {currentTraverse = {}} = {}) => {
    const {
        print,
        maybe,
        indent,
    } = printer;
    
    if (!semantics.comments)
        return;
    
    const {leadingComments} = path.node;
    
    if (!leadingComments?.length)
        return;
    
    if (hasCommentsPrinter(currentTraverse))
        return printComments(path, printer, semantics, {
            currentTraverse,
        });
    
    if (hasDecoratorsWithComments(path))
        return;
    
    const looksLikeSwitchCase = path.isSwitchCase();
    
    if (!looksLikeSwitchCase && hasTrailingComment(path.getPrevSibling()))
        return;
    
    const insideFn = (path.parentPath.isFunction() || path.parentPath.isTSDeclareMethod()) && !path.isTSTypeParameterDeclaration();
    
    const propIs = isProperty(path);
    const isIndent = isFirst(path)
        || !looksLikeSwitchCase
        && !path.isClassMethod()
        && !insideFn
        && !propIs;
    
    const count = leadingComments.length - 1;
    
    for (const [index, {type, value}] of leadingComments.entries()) {
        if (type === 'CommentLine') {
            if (index || !path.isClassProperty() && !path.isBinaryExpression())
                maybe.indent(isIndent);
            
            maybeInsideFn(insideFn, {
                print,
                indent,
            });
            
            if (isCommentOnPreviousLine(path))
                maybe.print.breakline(!isFirst(path));
            else
                maybe.print.space(propIs && !path.isClassProperty());
            
            print(`//${value}`);
            
            if (index === count) {
                maybe.print.breakline(propIs);
                maybe.print.newline(!propIs);
                
                if (isClassMethod(path)) {
                    indent();
                } else if (isBinaryExpression(path) || isDecorator(path)) {
                    indent.inc();
                    indent();
                    indent.dec();
                }
            } else {
                print.newline();
            }
            
            if (isInsideVar(path)) {
                indent.inc();
                indent();
                indent.dec();
            }
            
            continue;
        }
        
        if (type === 'CommentBlock') {
            maybe.indent(isIndent);
            
            const looksLikeMethod = path.isClassMethod();
            const looksLikeDirective = path.isDirective();
            const looksLikeProp = path.isObjectProperty();
            
            if (looksLikeProp)
                print.breakline();
            
            print(`/*${value}*/`);
            
            if (isTSPropertySignature(path) && !isPrev(path))
                print.breakline();
            
            if (path.isStatement() || path.isTSEnumMember() || looksLikeDirective || looksLikeMethod || looksLikeProp || looksLikeSwitchCase) {
                print.newline();
                markBefore(path);
                maybe.indent(looksLikeMethod || looksLikeProp || looksLikeSwitchCase);
            }
            
            continue;
        }
    }
};
