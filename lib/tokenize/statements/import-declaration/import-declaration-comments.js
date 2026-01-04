import {types} from '@putout/babel';

const {isExportDeclaration} = types;

export const printTrailingCommentLine = (path, printer, semantics, {printComment}) => {
    const {print} = printer;
    printComment();
    print.breakline();
};

export const printTrailingCommentBlock = (path, printer, semantics, {printComment}) => {
    const {maybe} = printer;
    const next = path.getNextSibling();
    
    maybe.print.breakline(!isExportDeclaration(next));
    printComment();
};
