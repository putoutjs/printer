import {markBefore} from '#mark';

export const SwitchCase = {};

SwitchCase.printLeadingCommentLine = (path, printer, semantics, {printComment}) => {
    const {print} = printer;
    
    printComment();
    print.newline();
};

SwitchCase.printLeadingCommentBlock = (path, printer, semantics, {printComment}) => {
    const {indent} = printer;
    
    printComment();
    markBefore(path);
    indent();
};
