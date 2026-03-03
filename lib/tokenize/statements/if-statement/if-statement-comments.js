import {types} from '@putout/babel';
import {isNext} from '#is';

const {isBlockStatement} = types;

export const printTrailingCommentBlock = (path, printer, semantics, {printComment}) => {
    const {maybe} = printer;
    const hasNext = isNext(path);
    
    maybe.print.breakline(!hasNext);
    printComment();
    //maybe.print.breakline(hasNext);
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
