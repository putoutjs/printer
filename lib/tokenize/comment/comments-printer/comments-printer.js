'use strict';

const createPrintCommentLine = (fn, value) => () => fn(`//${value}`);
const createPrintCommentBlock = (fn, value) => () => fn(`/*${value}*/\n`);

module.exports.hasTrailingCommentsPrinter = (currentTraverse) => {
    const {printTrailingCommentBlock} = currentTraverse;
    
    return Boolean(printTrailingCommentBlock);
};

module.exports.hasLeadingCommentsPrinter = (currentTraverse) => {
    const {printLeadingCommentLine} = currentTraverse;
    
    return Boolean(printLeadingCommentLine);
};

module.exports.printLeadingComments = (path, printer, semantics, {currentTraverse}) => {
    const {print} = printer;
    const {
        leadingComments = [],
    } = path.node;
    
    const {printLeadingCommentLine} = currentTraverse;
    
    for (const [index, {type, value}] of leadingComments.entries()) {
        if (type === 'CommentLine')
            printLeadingCommentLine?.(path, printer, semantics, {
                index,
                printComment: createPrintCommentLine(print, value),
            });
    }
};

module.exports.printTrailingComments = (path, printer, semantics, {currentTraverse}) => {
    const {print} = printer;
    const {
        trailingComments = [],
    } = path.node;
    
    const {printTrailingCommentBlock} = currentTraverse;
    
    for (const [index, {type, value}] of trailingComments.entries()) {
        if (type === 'CommentBlock')
            printTrailingCommentBlock?.(path, printer, semantics, {
                index,
                printComment: createPrintCommentBlock(print, value),
            });
    }
};
