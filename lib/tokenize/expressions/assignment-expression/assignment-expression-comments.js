'use strict';

const {types} = require('@putout/babel');
const {hasLeadingComment} = require('#is');
const noop = () => {};
const {isReturnStatement} = types;

module.exports.printLeadingCommentLine = noop;

module.exports.maybeInsideReturnWithCommentStart = (path, {print, indent}) => {
    const {parentPath} = path;
    
    if (isReturnStatement(parentPath) && hasLeadingComment(path)) {
        indent.inc();
        const {leadingComments} = path.node;
        
        print.breakline();
        for (const {type, value} of leadingComments) {
            if (type === 'CommentLine')
                print(`//${value}`);
            else
                print(`/*${value}*/`);
            
            print.breakline();
        }
    }
};

module.exports.maybeInsideReturnWithCommentEnd = (path, {print, indent}) => {
    const {parentPath} = path;
    
    if (!isReturnStatement(parentPath) || !hasLeadingComment(path))
        return;
    
    indent.dec();
    print.breakline();
};
