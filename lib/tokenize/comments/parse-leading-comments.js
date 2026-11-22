import {types} from '@putout/babel';
import {hasTrailingComment} from '#is';
import {markBefore} from '#mark';
import {maybeInsideFn} from './maybe-inside-fn.js';
import {
    printLeadingComments,
    hasLeadingCommentsPrinter,
} from './comments-printer/comments-printer.js';

const {
    isArrowFunctionExpression,
    isVariableDeclarator,
    isBinaryExpression,
    isClassMethod,
    isDecorator,
} = types;

const isInsideVar = (path) => {
    const {parentPath} = path;
    
    if (isVariableDeclarator(parentPath) && path === parentPath.get('init'))
        return true;
    
    if (!isArrowFunctionExpression(parentPath))
        return false;
    
    return isVariableDeclarator(parentPath.parentPath);
};

const hasDecoratorsWithComments = (path) => path?.parentPath.node?.decorators;

export const parseLeadingComments = (path, printer, semantics, {currentTraverse = {}} = {}) => {
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
    
    if (hasLeadingCommentsPrinter(currentTraverse))
        return printLeadingComments(path, printer, semantics, {
            currentTraverse,
        });
    
    if (hasDecoratorsWithComments(path))
        return;
    
    const looksLikeSwitchCase = path.isSwitchCase();
    
    if (!looksLikeSwitchCase && hasTrailingComment(path.getPrevSibling()))
        return;
    
    const insideFn = (path.parentPath.isFunction() || path.parentPath.isTSDeclareMethod()) && !path.isTSTypeParameterDeclaration();
    
    const isIndent = !looksLikeSwitchCase && !path.isClassMethod() && !insideFn;
    
    const count = leadingComments.length - 1;
    
    for (const [index, {type, value}] of leadingComments.entries()) {
        if (type === 'CommentLine') {
            if (index || !path.isBinaryExpression())
                maybe.indent(isIndent);
            
            maybeInsideFn(insideFn, {
                print,
                indent,
            });
            
            print(`//${value}`);
            
            if (index === count) {
                print.newline();
                
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
            
            print(`/*${value}*/`);
            
            if (path.isStatement() || path.isTSEnumMember() || looksLikeDirective || looksLikeMethod || looksLikeSwitchCase) {
                print.newline();
                markBefore(path);
                maybe.indent(looksLikeMethod || looksLikeSwitchCase);
            }
            
            continue;
        }
    }
};
