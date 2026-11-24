import {createTypeChecker} from '#type-checker';

const getPrevArg = (path) => {
    const {arguments: args, callee} = path.parentPath.node;
    
    return args[path.key - 1] || callee;
};

const isOwnLine = (path) => {
    const [comment] = path.node.leadingComments;
    const prev = getPrevArg(path);
    
    if (!prev.loc)
        return true;
    
    return comment.loc.start.line > prev.loc.end.line;
};

export const isOwnLineArg = createTypeChecker([
    ['-: listKey', '!=', 'arguments'],
    ['-: node.leadingComments.0.type', '!=', 'CommentLine'],
    ['+', isOwnLine],
]);

const isOnEndLine = (path) => {
    const {
        loc,
        trailingComments,
    } = path.node;
    
    if (!loc)
        return true;
    
    return trailingComments[0].loc.start.line === loc.end.line;
};

export const isTrailingLineArg = createTypeChecker([
    ['-: listKey', '!=', 'arguments'],
    ['-: node.trailingComments.0.type', '!=', 'CommentLine'],
    ['+', isOnEndLine],
]);

const isOnPrevLine = (path) => {
    const [comment] = path.node.leadingComments;
    const prev = path.parentPath.node.arguments[path.key - 1];
    
    if (!prev || !prev.loc)
        return false;
    
    return comment.loc.start.line === prev.loc.end.line;
};

export const isSameLineArg = createTypeChecker([
    ['-: listKey', '!=', 'arguments'],
    ['-: node.leadingComments.length', '!=', 1],
    ['-: node.leadingComments.0.type', '!=', 'CommentLine'],
    ['+', isOnPrevLine],
]);

export const callArgTrailingComments = {
    printTrailingCommentLine(path, printer, semantics, {printComment}) {
        const {print} = printer;
        
        print(',');
        print.space();
        printComment();
    },
};

export const callArgComments = {
    printLeadingCommentLine(path, printer, semantics, {printComment}) {
        printComment();
        printer.print.breakline();
    },
    printLeadingCommentBlock(path, printer, semantics, {printComment}) {
        printComment();
        printer.print.indent();
    },
};
