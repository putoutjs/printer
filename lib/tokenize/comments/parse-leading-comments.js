import {isInsideVar} from '#is';
import {maybeInsideFn} from './maybe-inside-fn.js';
import {
    printLeadingComments,
    hasLeadingCommentsPrinter,
} from './comments-printer/comments-printer.js';
import {
    isOwnLineArg,
    isSameLineArg,
    isElementOrParam,
    callArgComments,
    listItemComments,
} from '../expressions/call-expression/comments.js';
import {isGapRight} from './comments-printer/operand-comments.js';
import {isKeywordArgument} from './comments-printer/argument-comments.js';
import {statementComments} from './comments-printer/statement-comments.js';

const hasDecoratorsWithComments = (path) => path?.parentPath.node?.decorators;

const isSharedWithDecorator = ({node}) => {
    const {decorators = []} = node;
    const last = decorators.at(-1);
    
    return last && last.trailingComments === node.leadingComments;
};

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
    
    if (isGapRight(path) || isKeywordArgument(path))
        return;
    
    if (hasLeadingCommentsPrinter(currentTraverse))
        return printLeadingComments(path, printer, semantics, {
            currentTraverse,
        });
    
    if (hasDecoratorsWithComments(path) || isSharedWithDecorator(path))
        return;
    
    if (isOwnLineArg(path) || isSameLineArg(path))
        return printLeadingComments(path, printer, semantics, {
            currentTraverse: callArgComments,
        });
    
    if (isElementOrParam(path))
        return printLeadingComments(path, printer, semantics, {
            currentTraverse: listItemComments,
        });
    
    if (path.isStatement())
        return printLeadingComments(path, printer, semantics, {
            currentTraverse: statementComments,
        });
    
    const insideFn = (path.parentPath.isFunction() || path.parentPath.isTSDeclareMethod()) && !path.isTSTypeParameterDeclaration();
    
    const isIndent = !insideFn;
    
    for (const {type, value} of leadingComments) {
        if (type === 'CommentLine') {
            maybe.indent(isIndent);
            
            maybeInsideFn(insideFn, {
                print,
                indent,
            });
            
            print(`//${value}`);
            
            print.newline();
            
            if (isInsideVar(path)) {
                indent.inc();
                indent();
                indent.dec();
            }
            
            continue;
        }
        
        if (type === 'CommentBlock') {
            maybe.indent(isIndent);
            
            print(`/*${value}*/`);
            
            continue;
        }
    }
};
