export const isFirstProperty = (path) => path === path.parentPath.get('properties')[0];

export const printPropertyLeadingCommentLine = (path, printer, semantics, {printComment, isLast, isPreviousLine}) => {
    const {print, maybe} = printer;
    const first = isFirstProperty(path);
    
    maybe.indent(first);
    
    if (isPreviousLine())
        maybe.print.breakline(!first);
    else
        print.space();
    
    printComment();
    
    if (isLast) {
        print.breakline();
        return;
    }
    
    print.newline();
};
