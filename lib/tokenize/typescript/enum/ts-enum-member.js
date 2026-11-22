import {markBefore} from '#mark';

export const TSEnumMember = (path, {print, indent}) => {
    const {initializer} = path.node;
    indent();
    print('__id');
    
    if (initializer) {
        print.space();
        print('=');
        print.space();
        print('__initializer');
    }
};

TSEnumMember.printLeadingCommentLine = (path, printer, semantics, {printComment}) => {
    const {print, indent} = printer;
    
    indent();
    printComment();
    print.newline();
};

TSEnumMember.printLeadingCommentBlock = (path, printer, semantics, {printComment}) => {
    const {indent} = printer;
    
    indent();
    printComment();
    markBefore(path);
};
