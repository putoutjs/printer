'use strict';

const {types} = require('@putout/babel');
const {hasLeadingComment} = require('#is');
const {isReturnStatement} = types;

module.exports.printLeadingCommentLine = (path, printer, semantics, {printComment, isLast}) => {
    const {parentPath} = path;
    const {print, maybe} = printer;
    
    if (isReturnStatement(parentPath))
        return;
    
    maybe.print.breakline(!isLast);
    printComment();
    print.breakline();
};

module.exports.printLeadingCommentBlock = (path, printer, semantics, {printComment}) => {
    const {parentPath} = path;
    const {print} = printer;
    
    if (isReturnStatement(parentPath))
        return;
    
    printComment();
    print.indent();
};

module.exports.maybeInsideReturnWithCommentStart = (path, {print, indent}) => {
    const {parentPath} = path;
    const is = isReturnStatement(parentPath);
    
    if (is && hasLeadingComment(path)) {
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
    const is = isReturnStatement(parentPath);
    
    if (!is || !hasLeadingComment(path))
        return;
    
    indent.dec();
    print.breakline();
};
