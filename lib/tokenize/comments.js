'use strict';

const {
    isFirst,
    isNext,
} = require('./is');

const {
    markBefore,
    hasPrevNewline,
} = require('./mark');

module.exports.parseLeadingComments = (path, {print, maybe}) => {
    const {leadingComments} = path.node;
    
    if (!leadingComments || !leadingComments.length)
        return;
    
    if (shouldAddNewlineBefore(path))
        print.linebreak();
    
    const isClass = !path.isClassMethod();
    
    for (const {type, value} of leadingComments) {
        maybe.indent(isClass);
        
        if (type === 'CommentLine') {
            print(`//${value}`);
            print.newline();
            
            continue;
        }
        
        if (type === 'CommentBlock') {
            print(`/*${value}*/`);
            
            if (path.isStatement() || path.isClassMethod()) {
                print.newline();
                markBefore(path);
                maybe.indent(path.isClassMethod());
            }
            
            continue;
        }
    }
};

module.exports.parseTrailingComments = (path, {write, maybe}) => {
    const {trailingComments} = path.node;
    
    if (!trailingComments || !trailingComments.length)
        return;
    
    if (isNext(path))
        return;
    
    for (const {type, value, loc} of trailingComments) {
        if (type === 'CommentLine') {
            const sameLine = isSameLine(path, loc);
            maybe.write.space(sameLine);
            maybe.indent(!sameLine);
            write(`//${value}`);
            maybe.write.newline(!sameLine);
        }
    }
};

function shouldAddNewlineBefore(path) {
    return path.isStatement() && !isFirst(path) && !hasPrevNewline(path);
}

function isSameLine(path, loc) {
    return path.node.loc.start.line === loc.start.line;
}
