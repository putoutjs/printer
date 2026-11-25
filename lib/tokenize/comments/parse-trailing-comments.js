import {types} from '@putout/babel';
import {
    isLast,
    isCoupleLines,
    isClassMember,
} from '#is';
import {
    isTrailingCommentArg,
    callArgTrailingComments,
} from '../expressions/call-expression/comments.js';
import {isGapPrev} from './comments-printer/operand-comments.js';
import * as statementTrailingComments from './comments-printer/statement-trailing-comments.js';
import {isLooksLikeChain} from '../expressions/member-expression/is-looks-like-chain/index.js';
import {
    printTrailingComments,
    hasTrailingCommentsPrinter,
} from './comments-printer/comments-printer.js';

const {
    isMemberExpression,
    isCallExpression,
} = types;

const isFnParam = (path) => {
    const {parentPath} = path;
    
    if (!parentPath.isFunction())
        return false;
    
    return parentPath.get('params').includes(path);
};

function isSameLine(path, loc) {
    return path.node.loc?.start.line === loc.start.line || path.node.loc?.end.line === loc.end.line;
}

const isNewlineAfter = (path) => {
    const {parentPath} = path;
    
    if (isMemberExpression(parentPath))
        return false;
    
    return !isLast(path);
};

function isCommentOnNextLine({node}) {
    const {
        loc,
        trailingComments,
    } = node;
    
    const [comment] = trailingComments;
    const {line} = comment.loc.start;
    
    if (!loc)
        return true;
    
    const startLine = loc.start.line;
    const endLine = loc.end.line;
    const isNextLine = line === startLine + 1 && line === endLine + 1;
    const isNextLineAfterNewline = line === startLine + 2 && line === endLine + 2;
    
    return isNextLine || isNextLineAfterNewline;
}

export const parseTrailingComments = (path, printer, semantics, {currentTraverse} = {}) => {
    const {parentPath} = path;
    const {
        write,
        maybe,
        indent,
    } = printer;
    
    if (!semantics.comments)
        return;
    
    const {trailingComments} = path.node;
    
    if (!trailingComments?.length)
        return;
    
    if (isGapPrev(path))
        return;
    
    if (hasTrailingCommentsPrinter(currentTraverse))
        return printTrailingComments(path, printer, semantics, {
            currentTraverse,
        });
    
    if (isTrailingCommentArg(path))
        return printTrailingComments(path, printer, semantics, {
            currentTraverse: callArgTrailingComments,
        });
    
    if (path.isStatement() || isClassMember(path))
        return printTrailingComments(path, printer, semantics, {
            currentTraverse: statementTrailingComments,
        });
    
    if (path.isDirective())
        return;
    
    const likeChain = isLooksLikeChain(parentPath);
    
    for (const {type, value, loc} of trailingComments) {
        const sameLine = isSameLine(path, loc);
        const commentOnNextLine = isCommentOnNextLine(path);
        
        if (type === 'CommentLine') {
            const nextLineInChain = commentOnNextLine && likeChain;
            const shouldIndent = !sameLine && !commentOnNextLine;
            
            maybe.write.breakline(commentOnNextLine);
            maybe.write.space(sameLine);
            
            if (shouldIndent || nextLineInChain) {
                maybe.indent.inc(nextLineInChain);
                indent();
                maybe.indent.dec(nextLineInChain);
            }
            
            write(`//${value}`);
            maybe.write.newline(isNewlineAfter(path));
            
            continue;
        }
        
        if (type === 'CommentBlock') {
            maybe.write.space(sameLine);
            maybe.indent(!sameLine);
            maybe.print.breakline(isPrevCall(path));
            write(`/*${value}*/`);
            maybe.write.newline(!sameLine || !isFnParam(path) && isCoupleLines(path.parentPath));
        }
    }
};

function isPrevCall(path) {
    const {expression} = path.node;
    
    return isCallExpression(expression);
}
