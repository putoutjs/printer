import {isNext} from '#is';

export const printTrailingCommentBlock = (path, printer, semantics, {printComment}) => {
    const {maybe} = printer;
    const hasNext = isNext(path);
    
    maybe.print.breakline(!hasNext);
    printComment();
};

export const printTrailingCommentLine = (path, printer, semantics, {printComment}) => {
    const {print} = printer;
    
    print.indent();
    
    printComment();
    print.newline();
};
