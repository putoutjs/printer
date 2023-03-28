'use strict';

const {isFirst} = require('./is');
const {markBefore} = require('./mark');

module.exports.parseComments = (path, {print, indent, maybe}) => {
    const {leadingComments} = path.node;
    
    if (leadingComments)
        parseLeadingComments(path, {
            print,
            indent,
            maybe,
        });
};

function parseLeadingComments(path, {print, indent}) {
    const {leadingComments} = path.node;
    
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
}

function shouldAddNewlineBefore(path) {
    const {leadingComments} = path.node;
    
    if (!leadingComments.length)
        return false;
    
    return path.isStatement() && !isFirst(path);
}
