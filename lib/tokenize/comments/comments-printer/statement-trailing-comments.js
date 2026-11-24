import {
    isLast,
    isNext,
    isCoupleLines,
} from '#is';

const {isArray} = Array;

const hasBody = (path) => {
    if (path.isTSModuleDeclaration())
        return true;
    
    const {body} = path.node;
    
    return isArray(body) && body.length;
};

const isTrailingIsLeading = (path) => {
    const {node} = path.getNextSibling();
    
    if (!node)
        return false;
    
    return path.node.trailingComments === node.leadingComments;
};

const isSameLine = (path, loc) => {
    const {loc: pathLoc} = path.node;
    
    if (!pathLoc)
        return !isCommentOnNextLine(path);
    
    return pathLoc.start.line === loc.start.line || pathLoc.end.line === loc.end.line;
};

function isCommentOnNextLine(path) {
    const {
        loc,
        trailingComments,
    } = path.node;
    
    if (isTrailingIsLeading(path))
        return false;
    
    if (path.isThrowStatement())
        return false;
    
    const [comment] = trailingComments;
    const {line} = comment.loc.start;
    const {node} = path.getNextSibling();
    
    if (node?.loc && line < node.loc.start.line)
        return false;
    
    if (!loc)
        return true;
    
    const startLine = loc.start.line;
    const endLine = loc.end.line;
    const isNextLine = line === startLine + 1 && line === endLine + 1;
    const isNextLineAfterNewline = line === startLine + 2 && line === endLine + 2;
    
    return isNextLine || isNextLineAfterNewline;
}

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
