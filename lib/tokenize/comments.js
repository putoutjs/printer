'use strict';

const {
    isFirst,
    isNext,
} = require('./is');
const {
    markBefore,
    hasPrevNewline,
} = require('./mark');

module.exports.parseLeadingComments = (path, {print, indent}) => {
    const {leadingComments} = path.node;
    
    if (!leadingComments || !leadingComments.length)
        return;
    
    if (shouldAddNewlineBefore(path))
        print.linebreak();
    
    for (const {type, value} of leadingComments) {
        indent();
        
        if (type === 'CommentLine') {
            print(`//${value}`);
            print.newline();
            
            continue;
        }
        
        if (type === 'CommentBlock') {
            print(`/*${value}*/`);
            
            if (path.isStatement()) {
                print.newline();
                markBefore(path);
            }
            
            continue;
        }
    }
};

module.exports.parseTrailingComments = (path, {print}) => {
    const {trailingComments} = path.node;
    
    if (!trailingComments || !trailingComments.length)
        return;
    
    if (isNext(path))
        return;
    
    for (const {type, value} of trailingComments) {
        if (type === 'CommentLine') {
            print.space();
            print(`//${value}`);
            
            continue;
        }
    }
};

function shouldAddNewlineBefore(path) {
    return path.isStatement() && !isFirst(path) && !hasPrevNewline(path);
}
