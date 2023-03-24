'use strict';

module.exports.parseComments = (path, {write}) => {
    const {leadingComments} = path.node;
    
    if (leadingComments)
        parseLeadingComments(path, {write});
};

function parseLeadingComments(path, {write}) {
    const {leadingComments} = path.node;
    
    for (const {type, value} of leadingComments) {
        if (type === 'CommentLine') {
            write(`//${value}`);
            write.newline();
            continue;
        }
        
        if (type === 'CommentBlock') {
            write.newline();
            write(`/*${value}*/`);
            continue;
        }
    }
}
