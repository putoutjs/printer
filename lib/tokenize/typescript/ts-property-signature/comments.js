import {isPrev} from '#is';

export const printLeadingCommentLine = (path, printer, semantics, {printComment}) => {
    const {print} = printer;
    print.breakline();
    printComment();
    print.breakline();
};

export const printLeadingCommentBlock = (path, printer, semantics, {printComment}) => {
    const {print, maybe} = printer;
    
    maybe.print.breakline(!isPrev(path));
    printComment();
    print.indent();
};

export const printTrailingCommentBlock = () => {};
