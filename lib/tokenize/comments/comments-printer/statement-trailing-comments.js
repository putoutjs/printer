import {createTypeChecker} from '#type-checker';
import {
    isLast,
    isNext,
    isCoupleLines,
    isClassMember,
} from '#is';

const hasBody = createTypeChecker([
    '+: -> TSModuleDeclaration',
    '+: node.body.length -> +',
]);

const isTrailingIsLeading = (path) => {
    const {node} = path.getNextSibling();
    
    if (!node)
        return false;
    
    return path.node.trailingComments === node.leadingComments;
};

const isSameLine = (path, loc) => {
    const {loc: pathLoc} = path.node;
    
    if (!pathLoc)
        return !isClassMember(path) && !isCommentOnNextLine(path);
    
    return pathLoc.start.line === loc.start.line || pathLoc.end.line === loc.end.line;
};

const isBeforeNext = (path) => {
    const {node} = path.getNextSibling();
    
    if (!node || !node.loc)
        return false;
    
    const [comment] = path.node.trailingComments;
    
    return comment.loc.start.line < node.loc.start.line;
};

const hasNoLoc = ({node}) => !node.loc;

const isNextLine = (path) => {
    const {
        loc,
        trailingComments,
    } = path.node;
    
    const [comment] = trailingComments;
    const {line} = comment.loc.start;
    const startLine = loc.start.line;
    const endLine = loc.end.line;
    const isNext = line === startLine + 1 && line === endLine + 1;
    const isNextAfterNewline = line === startLine + 2 && line === endLine + 2;
    
    return isNext || isNextAfterNewline;
};

const isCommentOnNextLine = createTypeChecker([
    ['-: -> ClassMethod'],
    ['-', isTrailingIsLeading],
    ['-: -> ThrowStatement'],
    ['-', isBeforeNext],
    ['+', hasNoLoc],
    ['+', isNextLine],
]);

export const printTrailingCommentLine = (path, printer, semantics, {index}) => {
    const {
        write,
        maybe,
        indent,
    } = printer;
    
    const {trailingComments} = path.node;
    const {value, loc} = trailingComments[index];
    
    const n = trailingComments.length - 1;
    const sameLine = isSameLine(path, loc);
    const commentOnNextLine = isCommentOnNextLine(path);
    
    maybe.write.breakline(commentOnNextLine);
    maybe.write.space(sameLine);
    
    if (!sameLine && !commentOnNextLine)
        indent();
    
    if (hasBody(path)) {
        maybe.write.breakline(!isNext(path));
        maybe.write.breakline(!n);
    }
    
    write(`//${value}`);
    maybe.write.newline(!isLast(path));
};

export const printTrailingCommentBlock = (path, printer, semantics, {index}) => {
    const {write, maybe} = printer;
    const {value, loc} = path.node.trailingComments[index];
    const sameLine = isSameLine(path, loc);
    
    maybe.write.space(sameLine);
    maybe.indent(!sameLine);
    write(`/*${value}*/`);
    maybe.write.newline(!sameLine || isCoupleLines(path.parentPath));
};
