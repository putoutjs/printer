'use strict';

const {isFirst} = require('./is');
const {hasPrevNewline} = require('./mark');

module.exports.parseComments = (path, {print}) => {
    const {leadingComments} = path.node;
    
    if (leadingComments)
        parseLeadingComments(path, {print});
};

function parseLeadingComments(path, {print}) {
    const {leadingComments} = path.node;
    
    if (shouldAddNewline(path))
        print.linebreak();
    
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

function shouldAddNewline(path) {
    return path.isStatement() && !isFirst(path) && !hasPrevNewline(path);
}
