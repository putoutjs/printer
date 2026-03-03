import {types} from '@putout/babel';
import {isNext, isParentBlock} from '#is';

const {isBlockStatement} = types;

export const printTrailingCommentBlock = (path, printer, semantics, {printComment}) => {
    const {maybe} = printer;
    const hasNext = isNext(path);
    
    maybe.print.breakline(!hasNext);
    printComment();
};

export const printTrailingCommentLine = (path, printer, semantics, {printComment}) => {
    const hasNext = isNext(path);
    const {consequent} = path.node;
    const consequentIsBlock = isBlockStatement(consequent);
    const {print} = printer;
    
    print.indent();
    
    if (!hasNext && !consequentIsBlock)
        print.space();
    
    printComment();
    
    if (hasNext || isParentBlock(path))
        print.newline();
};
