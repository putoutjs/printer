import {hasTrailingComment} from '#is';
import {markBefore} from '#mark';

const printLeadingCommentLine = (path, printer, semantics, {printComment}) => {
    const {print, indent} = printer;
    
    if (hasTrailingComment(path.getPrevSibling()))
        return;
    
    indent();
    printComment();
    print.newline();
};

const printLeadingCommentBlock = (path, printer, semantics, {printComment}) => {
    const {indent} = printer;
    
    if (hasTrailingComment(path.getPrevSibling()))
        return;
    
    indent();
    printComment();
    markBefore(path);
};

export const statementComments = {
    printLeadingCommentLine,
    printLeadingCommentBlock,
};
