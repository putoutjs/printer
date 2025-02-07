'use strict';

const {types} = require('@putout/babel');

const {
    isLast,
    isCoupleLines,
    isNext,
} = require('../is');

const {isLooksLikeChain} = require('../expressions/member-expression/is-looks-like-chain');

const {
    isDecorator,
    isMemberExpression,
} = types;

const hasBody = (path) => {
    if (path.isTSModuleDeclaration())
        return true;
    
    return path.node.body?.length;
};

const isFnParam = (path) => {
    const {parentPath} = path;
    
    if (!parentPath.isFunction())
        return false;
    
    return parentPath.get('params').includes(path);
};

function isSameLine(path, loc) {
    return path.node.loc?.start.line === loc.start.line || path.node.loc?.end.line === loc.end.line;
}

const isTrailingIsLeading = (path) => path.node.trailingComments === path.getNextSibling().node?.leadingComments;

const isNewlineAfter = (path) => {
    const {parentPath} = path;
    
    if (isDecorator(path)) {
        const {loc} = path.node.trailingComments[0];
        return !isSameLine(path, loc);
    }
    
    if (isMemberExpression(parentPath))
        return false;
    
    return !isLast(path);
};

module.exports.isTrailingIsLeading = isTrailingIsLeading;

function isCommentOnNextLine(path) {
    const {node} = path;
    const {
        loc,
        trailingComments,
    } = node;
    
    if (path.isClassMethod())
        return false;
    
    if (isTrailingIsLeading(path))
        return false;
    
    if (path.isThrowStatement())
        return false;
    
    const [comment] = trailingComments;
    const {line} = comment.loc.start;
    
    const next = path.getNextSibling();
    
    if (next.node && line < next.node.loc?.start.line)
        return false;
    
    if (!loc)
        return true;
    
    const startLine = loc.start.line;
    const endLine = loc.end.line;
    const isNextLine = line === startLine + 1 && line === endLine + 1;
    const isNextLineAfterNewline = line === startLine + 2 && line === endLine + 2;
    
    return isNextLine || isNextLineAfterNewline;
}

module.exports.parseTrailingComments = (path, {write, maybe, indent}, semantics) => {
    const {parentPath} = path;
    
    if (!semantics.comments)
        return;
    
    const {trailingComments} = path.node;
    
    if (!trailingComments?.length)
        return;
    
    if (path.isDirective())
        return;
    
    const n = trailingComments.length - 1;
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
            
            if (hasBody(path)) {
                maybe.write.breakline(!isNext(path));
                maybe.write.breakline(!n);
            }
            
            write(`//${value}`);
            maybe.write.newline(isNewlineAfter(path));
            
            continue;
        }
        
        if (type === 'CommentBlock') {
            maybe.write.space(sameLine);
            maybe.indent(!sameLine);
            write(`/*${value}*/`);
            maybe.write.newline(!sameLine || !isFnParam(path) && isCoupleLines(path.parentPath));
        }
    }
};
