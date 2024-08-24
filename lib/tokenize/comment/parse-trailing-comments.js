'use strict';

const {
    isDecorator,
    isMemberExpression,
} = require('@putout/babel').types;

const {
    isLast,
    isCoupleLines,
    isNext,
} = require('../is');

const hasBody = (path) => {
    if (path.isTSModuleDeclaration())
        return true;
    
    return path.node.body?.length;
};

const isFnParam = (path) => {
    const {parentPath} = path;
    
    if (!parentPath.isFunction())
        return false;
    
    return parentPath
        .get('params')
        .includes(path);
};

function isSameLine(path, loc) {
    return path.node.loc?.start.line === loc.start.line || path.node.loc?.end.line === loc.end.line;
}

const isTrailingIsLeading = (path) => path.node.trailingComments === path.getNextSibling().node?.leadingComments;

const isNewlineAfter = (path) => {
    const {parentPath} = path;
    
    if (isMemberExpression(parentPath))
        return false;
    
    return !isLast(path) && !isDecorator(path);
};

module.exports.isTrailingIsLeading = isTrailingIsLeading;

function isCommentOnNextLine(path) {
    const {node, parentPath} = path;
    const {
        loc,
        trailingComments,
    } = node;
    
    if (parentPath.isMemberExpression())
        return false;
    
    if (path.isClassMethod())
        return false;
    
    if (isTrailingIsLeading(path))
        return false;
    
    if (path.isThrowStatement())
        return false;
    
    const [comment] = trailingComments;
    const {line} = comment.loc.start;
    
    const next = path.getNextSibling();
    
    if (next.node && line < next.node.loc.start.line)
        return false;
    
    const isNextLine = line === loc.start.line + 1;
    const isNextLineAfterNewline = line === loc.start.line + 2;
    
    return isNextLine || isNextLineAfterNewline;
}

module.exports.parseTrailingComments = (path, {write, maybe}, semantics) => {
    if (!semantics.comments)
        return;
    
    const {trailingComments} = path.node;
    
    if (!trailingComments?.length)
        return;
    
    if (path.isDirective())
        return;
    
    const n = trailingComments.length - 1;
    
    for (const {type, value, loc} of trailingComments) {
        const sameLine = isSameLine(path, loc);
        const commentOnNextLine = isCommentOnNextLine(path);
        
        if (type === 'CommentLine') {
            maybe.write.breakline(commentOnNextLine);
            maybe.write.space(sameLine);
            maybe.indent(!sameLine && !commentOnNextLine);
            
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
