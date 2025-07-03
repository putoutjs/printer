'use strict';

const createPrintCommentLine = (fn, value) => () => fn(`//${value}`);
const createPrintCommentBlock = (fn, value) => () => fn(`/*${value}*/\n`);

module.exports.hasTrailingCommentsPrinter = (currentTraverse) => {
    const {
        printTrailingCommentBlock,
        printTrailingCommentLine,
    } = currentTraverse;
    
    if (printTrailingCommentBlock)
        return true;
    
    return Boolean(printTrailingCommentLine);
};

module.exports.hasLeadingCommentsPrinter = (currentTraverse) => {
    const {
        printLeadingCommentLine,
        printLeadingCommentBlock,
    } = currentTraverse;
    
    if (printLeadingCommentLine)
        return true;
    
    return Boolean(printLeadingCommentBlock);
};

module.exports.printLeadingComments = (path, printer, semantics, {currentTraverse}) => {
    const {print} = printer;
    const {
        leadingComments = [],
    } = path.node;
    
    const {
        printLeadingCommentLine,
        printLeadingCommentBlock,
    } = currentTraverse;
    
    const n = leadingComments.length - 1;
    
    for (const [index, {type, value}] of leadingComments.entries()) {
        if (type === 'CommentLine') {
            printLeadingCommentLine?.(path, printer, semantics, {
                index,
                printComment: createPrintCommentLine(print, value),
                isLast: index === n,
            });
            continue;
        }
        
        if (type === 'CommentBlock')
            printLeadingCommentBlock?.(path, printer, semantics, {
                index,
                printComment: createPrintCommentBlock(print, value),
            });
    }
};

module.exports.printTrailingComments = (path, printer, semantics, {currentTraverse}) => {
    const {print} = printer;
    const {
        trailingComments = [],
    } = path.node;
    
    const {
        printTrailingCommentLine,
        printTrailingCommentBlock,
    } = currentTraverse;
    
    const n = trailingComments.length - 1;
    
    for (const [index, {type, value}] of trailingComments.entries()) {
        if (type === 'CommentLine') {
            printTrailingCommentLine?.(path, printer, semantics, {
                index,
                printComment: createPrintCommentLine(print, value),
                isLast: index === n,
            });
            continue;
        }
        
        if (type === 'CommentBlock')
            printTrailingCommentBlock?.(path, printer, semantics, {
                index,
                printComment: createPrintCommentBlock(print, value),
            });
    }
};

