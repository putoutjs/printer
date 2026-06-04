export const Decorator = (path, {print}) => {
    print('@');
    print('__expression');
};

Decorator.printLeadingCommentLine = (path, printer, semantics, {printComment}) => {
    const {print} = printer;
    printComment();
    print.breakline();
};
