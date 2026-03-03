import {types} from '@putout/babel';

const {isBlockStatement} = types;

export const printTrailingCommentBlock = (path, printer, semantics, {printComment}) => {
    const {print} = printer;
    print.breakline();
    printComment();
};

export const printTrailingCommentLine = (path, printer, semantics, {printComment}) => {
    const {consequent} = path.node;
    const consequentIsBlock = isBlockStatement(consequent);
    const {print, maybe} = printer;
    
    print.indent();
    maybe.print.space(!consequentIsBlock);
    
    printComment();
    maybe.print.newline(consequentIsBlock);
};
