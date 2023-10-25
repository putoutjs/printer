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

module.exports.parseTrailingComments = (path, {write, maybe}, semantics) => {
    if (!semantics.comments)
        return;
    
    const {trailingComments} = path.node;
    
    if (!trailingComments?.length)
        return;
    
    if (path.isDirective())
        return;
    
    const n = trailingComments.length - 1;
    
    for (const [i, {type, value, loc}] of trailingComments.entries()) {
        const sameLine = isSameLine(path, loc);
        
        if (type === 'CommentLine') {
            maybe.write.space(sameLine);
            maybe.indent(!sameLine);
            
            if (hasBody(path)) {
                maybe.write.breakline(i || i === n);
                maybe.write.breakline(!isNext(path));
            }
            
            write(`//${value}`);
            maybe.write.newline(i === n && !isLast(path) && !isDecorator(path));
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
