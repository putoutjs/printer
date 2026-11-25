import {createTypeChecker} from '#type-checker';
import {isInsideVar} from '#is';
import {
    isOwnLineArg,
    callArgComments,
} from '../call-expression/comments.js';

const hasLineComment = ({node}) => {
    const [first = {}] = node.leadingComments || [];
    
    return first.type === 'CommentLine';
};

export const isNewlineComment = createTypeChecker([
    ['-: -> !BinaryExpression'],
    ['-: -> !', hasLineComment],
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

export const printLeadingCommentLine = (path, printer, semantics, options) => {
    const {
        index,
        isLast,
        printComment,
    } = options;
    
    const {
        print,
        maybe,
        indent,
    } = printer;
    
    if (isOwnLineArg(path))
        return callArgComments.printLeadingCommentLine(path, printer, semantics, options);
    
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

export const printLeadingCommentBlock = (path, printer, semantics, options) => {
    const {index} = options;
    const {print} = printer;
    const {value} = path.node.leadingComments[index];
    
    print(`/*${value}*/`);
    print.space();
};
