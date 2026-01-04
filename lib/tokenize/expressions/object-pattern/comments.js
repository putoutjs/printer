const createPrintCommentLine = (fn) => (value) => fn(`//${value}`);
const createPrintCommentBlock = (fn) => (value) => fn(`/*${value}*/`);

export const printLeadingComments = (path, {print}) => {
    const printCommentLine = createPrintCommentLine(print);
    const printCommentBlock = createPrintCommentBlock(print);
    const {leadingComments} = path.node;
    
    if (!leadingComments)
        return;
    
    for (const {type, value} of leadingComments) {
        if (type === 'CommentLine')
            printCommentLine(value);
        else
            printCommentBlock(value);
        
        print.breakline();
    }
};
