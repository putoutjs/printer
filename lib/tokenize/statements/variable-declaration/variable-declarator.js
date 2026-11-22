export const VariableDeclarator = {};

VariableDeclarator.printLeadingCommentLine = (path, printer, semantics, {printComment, isLast, isPreviousLine}) => {
    const {print} = printer;
    
    if (isPreviousLine())
        print.breakline();
    else
        print.space();
    
    printComment();
    
    if (isLast) {
        print.breakline();
        return;
    }
    
    print.newline();
};

VariableDeclarator.printLeadingCommentBlock = (path, printer, semantics, {index}) => {
    const {print} = printer;
    const {value} = path.node.leadingComments[index];
    
    print(`/*${value}*/`);
};
