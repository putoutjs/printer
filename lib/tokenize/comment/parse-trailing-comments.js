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
    
    for (const {type, value, loc} of trailingComments) {
        const sameLine = isSameLine(path, loc);
        
        if (type === 'CommentLine') {
            maybe.write.space(sameLine);
            maybe.indent(!sameLine);
            
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
