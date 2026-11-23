import {createTypeChecker} from '#type-checker';
import {isInsideVar} from '#is';

const hasLineComment = ({node}) => {
    const [first = {}] = node.leadingComments || [];
    
    return first.type === 'CommentLine';
};

const isOwnLine = (path) => {
    const [comment] = path.node.leadingComments;
    const {loc} = path.parentPath.node.left;
    
    if (!loc)
        return true;
    
    return comment.loc.start.line > loc.end.line;
};

const isLogicalRightOnOwnLine = (path) => {
    if (!path.parentPath.isLogicalExpression())
        return false;
    
    return path.key === 'right' && isOwnLine(path);
};

export const isNewlineComment = createTypeChecker([
    ['-: -> !BinaryExpression'],
    ['-: -> !', hasLineComment],
    ['+', isLogicalRightOnOwnLine],
    ['-: parentPath -> LogicalExpression'],
    ['+: parentPath -> VariableDeclarator'],
    ['+: parentPath -> AssignmentExpression'],
    ['+: parentPath -> ArrowFunctionExpression'],
]);

const maybeIndentOnce = (is, {indent}) => {
    if (!is)
        return;
    
    indent.inc();
    indent();
    indent.dec();
};

export const printLeadingCommentLine = (path, printer, semantics, {index, isLast, printComment}) => {
    const {
        print,
        maybe,
        indent,
    } = printer;
    
    if (isNewlineComment(path)) {
        if (!index)
            indent.inc();
        
        print.breakline();
        printComment();
        
        if (!isLast)
            return;
        
        print.breakline();
        indent.dec();
        
        return;
    }
    
    maybe.indent(index);
    printComment();
    print.newline();
    
    maybeIndentOnce(isLast, printer);
    maybeIndentOnce(isInsideVar(path), printer);
};

export const printLeadingCommentBlock = (path, printer, semantics, {index}) => {
    const {print} = printer;
    const {value} = path.node.leadingComments[index];
    
    print(`/*${value}*/`);
    print.space();
};
