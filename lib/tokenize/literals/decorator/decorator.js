export const Decorator = (path, {print}) => {
    print('@');
    print('__expression');
};

Decorator.printLeadingCommentLine = (path, printer, semantics, {printComment}) => {
    const {print} = printer;
    const {node} = path.getPrevSibling();
    
    if (node && node.trailingComments === path.node.leadingComments)
        return;
    
    printComment();
    print.breakline();
};

Decorator.printTrailingCommentLine = (path, printer, semantics, {isSameLine, printComment}) => {
    const {print} = printer;
    
    if (isSameLine)
        print.space();
    else
        print.breakline();
    
    printComment();
};

Decorator.printTrailingCommentBlock = (path, printer, semantics, {index, isSameLine}) => {
    const {print} = printer;
    const {value} = path.node.trailingComments[index];
    
    if (isSameLine)
        print.space();
    else
        print.breakline();
    
    print(`/*${value}*/`);
};
