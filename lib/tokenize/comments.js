'use strict';

module.exports.parseComments = (path, {print}) => {
    const {leadingComments} = path.node;
    
    if (leadingComments)
        parseLeadingComments(path, {print});
};

function parseLeadingComments(path, {print}) {
    const {leadingComments} = path.node;
    
    for (const {type, value} of leadingComments) {
        if (type === 'CommentLine') {
            print(`//${value}`);
            print.newline();
            continue;
        }
        
        if (type === 'CommentBlock') {
            print(`/*${value}*/`);
            continue;
        }
    }
}
