'use strict';

const {isDecorator} = require('@putout/babel').types;
const {
    isLast,
    isCoupleLines,
    isNext,
} = require('../is');

const hasBody = (path) => path.node.body;

function isSameLine(path, loc) {
    return path.node.loc?.start.line === loc.start.line || path.node.loc?.end.line === loc.end.line;
}

const isTrailingIsLeading = (path) => path.node.trailingComments === path.getNextSibling().node?.leadingComments;

function isCommentOnNextLine(path) {
    const {
        loc,
        trailingComments,
    } = path.node;
    
    if (isTrailingIsLeading(path))
        return false;
    
    const [comment] = trailingComments;
    const {line} = comment.loc.start;
    
    return line === loc.start.line + 1;
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
            maybe.write.newline(!isLast(path) && !isDecorator(path));
            
            continue;
        }
        
        if (type === 'CommentBlock') {
            maybe.write.space(sameLine);
            maybe.indent(!sameLine);
            write(`/*${value}*/`);
            maybe.write.newline(!sameLine || isCoupleLines(path.parentPath));
        }
    }
};

