'use strict';

const {isNext} = require('../is');

module.exports.parseComments = (path, {write, maybe}, semantics) => {
    if (!semantics.comments)
        return;
    
    const comments = path.node.comments || path.node.innerComments;
    
    if (!comments)
        return;
    
    const n = comments.length - 1;
    const program = path.isProgram();
    
    for (const [i, {type, value}] of comments.entries()) {
        if (type === 'CommentLine') {
            maybe.write.breakline(isNext(path) || !program);
            write('//');
            write(value);
            
            if (program) {
                maybe.write.newline(i < n);
                continue;
            }
            
            write.newline();
            continue;
        }
        
        if (type === 'CommentBlock') {
            write('/*');
            write(value);
            write('*/');
        }
    }
};
