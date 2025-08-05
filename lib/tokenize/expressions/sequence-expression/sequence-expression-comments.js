'use strict';

const {hasLeadingComment} = require('#is');
const noop = () => {};

module.exports.printLeadingCommentLine = noop;
module.exports.printLeadingCommentBlock = noop;

module.exports.maybePrintComments = (path, {print}) => {
    if (hasLeadingComment(path)) {
        const {leadingComments} = path.node;
        
        for (const {type, value} of leadingComments) {
            if (type === 'CommentLine')
                print(`//${value}`);
            else
                print(`/*${value}*/`);
            
            print.breakline();
        }
    }
};
