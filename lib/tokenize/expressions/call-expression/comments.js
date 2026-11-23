export const isOwnLineArg = (path) => {
    if (path.listKey !== 'arguments')
        return false;
    
    const {leadingComments} = path.node;
    
    if (!leadingComments)
        return false;
    
    const [comment] = leadingComments;
    
    if (comment.type !== 'CommentLine')
        return false;
    
    const {arguments: args, callee} = path.parentPath.node;
    const prev = args[path.key - 1] || callee;
    
    if (!prev.loc)
        return true;
    
    return comment.loc.start.line > prev.loc.end.line;
};

export const callArgComments = {
    printLeadingCommentLine(path, printer, semantics, {printComment}) {
        printComment();
        printer.print.breakline();
    },
    printLeadingCommentBlock(path, printer, semantics, {printComment}) {
        printComment();
        printer.print.indent();
    },
};
