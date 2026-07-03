const createPrintCommentLine = (fn, value) => () => fn(`//${value}`);
const createPrintCommentBlock = (fn, value) => () => fn(`/*${value}*/\n`);

const isCommentBlock = (node) => node.type === 'CommentBlock';
const isCommentLine = (node) => node.type === 'CommentLine';

function isSameLine(path, loc) {
    const {node} = path;
    
    if (!node.loc)
        return false;
    
    return node.loc.start.line === loc.start.line;
}

export const hasTrailingCommentsPrinter = (currentTraverse) => {
    const {
        printTrailingCommentBlock,
        printTrailingCommentLine,
    } = currentTraverse;
    
    if (printTrailingCommentBlock)
        return true;
    
    return Boolean(printTrailingCommentLine);
};

export const hasLeadingCommentsPrinter = (currentTraverse) => {
    const {
        printLeadingCommentLine,
        printLeadingCommentBlock,
    } = currentTraverse;
    
    if (printLeadingCommentLine)
        return true;
    
    return Boolean(printLeadingCommentBlock);
};

export const printLeadingComments = (path, printer, semantics, {currentTraverse}) => {
    const {print} = printer;
    const {
        leadingComments = [],
    } = path.node;
    
    const {
        printLeadingCommentLine,
        printLeadingCommentBlock,
    } = currentTraverse;
    
    const n = leadingComments.length - 1;
    
    for (const [index, comment] of leadingComments.entries()) {
        const {value} = comment;
        
        if (isCommentLine(comment)) {
            printLeadingCommentLine?.(path, printer, semantics, {
                index,
                printComment: createPrintCommentLine(print, value),
                isLast: index === n,
            });
            continue;
        }
        
        if (isCommentBlock(comment))
            printLeadingCommentBlock?.(path, printer, semantics, {
                index,
                printComment: createPrintCommentBlock(print, value),
            });
    }
};

export const printTrailingComments = (path, printer, semantics, {currentTraverse}) => {
    const {print} = printer;
    const {
        trailingComments = [],
    } = path.node;
    
    const {
        printTrailingCommentLine,
        printTrailingCommentBlock,
    } = currentTraverse;
    
    const n = trailingComments.length - 1;
    
    for (const [index, comment] of trailingComments.entries()) {
        const {loc, value} = comment;
        
        if (isCommentLine(comment)) {
            printTrailingCommentLine?.(path, printer, semantics, {
                index,
                printComment: createPrintCommentLine(print, value),
                isLast: index === n,
                isSameLine: isSameLine(path, loc),
            });
            continue;
        }
        
        if (isCommentBlock(comment)) {}
        
        printTrailingCommentBlock?.(path, printer, semantics, {
            index,
            printComment: createPrintCommentBlock(print, value),
        });
    }
};
