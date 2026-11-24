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

export const isTrailingLineArg = (path) => {
    if (path.listKey !== 'arguments')
        return false;
    
    const {
        trailingComments,
        loc,
    } = path.node;
    
    if (!trailingComments || !loc)
        return false;
    
    const [comment] = trailingComments;
    
    if (comment.type !== 'CommentLine')
        return false;
    
    return comment.loc.start.line === loc.end.line;
};

export const isSameLineArg = (path) => {
    if (path.listKey !== 'arguments')
        return false;
    
    const {leadingComments} = path.node;
    
    if (!leadingComments || leadingComments.length !== 1)
        return false;
    
    const [comment] = leadingComments;
    const prev = path.parentPath.node.arguments[path.key - 1];
    
    if (!prev || !prev.loc || comment.type !== 'CommentLine')
        return false;
    
    return comment.loc.start.line === prev.loc.end.line;
};

export const callArgTrailingComments = {
    printTrailingCommentLine(path, printer, semantics, {printComment}) {
        const {print} = printer;
        
        print(',');
        print.space();
        printComment();
    },
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
