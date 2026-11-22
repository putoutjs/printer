const isCommentOfPrevious = (path) => {
    const [comment] = path.node.leadingComments;
    const prev = path.getPrevSibling();
    
    if (!prev.node)
        return false;
    
    return prev.node.loc.start.line === comment.loc.start.line;
};

export const isCommentOnPreviousLine = (path) => {
    const {
        loc,
        leadingComments,
    } = path.node;
    
    const [comment] = leadingComments;
    
    if (isCommentOfPrevious(path))
        return false;
    
    return comment.loc.start.line <= loc.start.line - 1;
};
