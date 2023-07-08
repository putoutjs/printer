'use strict';

module.exports.parseComments = (path, {write}, semantics) => {
    if (!semantics.comments)
        return;
    
    const comments = path.node.comments || path.node.innerComments;
    
    if (!comments)
        return;
    
    for (const {type, value} of comments) {
        if (type === 'CommentLine') {
            write.breakline();
            write('//');
            write(value);
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
