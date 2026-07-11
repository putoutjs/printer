import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {
    isNext,
    hasTrailingComment,
    isInsideBlock,
    callWithNext,
} from '#is';

const {
    isBlockStatement,
    isProgram,
    isIfStatement,
} = types;

export const printLeadingCommentLine = (path, printer, semantics, {index, isLast, printComment}) => {
    const {print, indent} = printer;
    const prev = path.getPrevSibling();
    const {parentPath} = path;
    
    if (hasTrailingComment(prev))
        return;
    
    if (!index && !prev.node && (isIfStatement(parentPath) || isBlockStatement(parentPath)))
        indent();
    
    printComment();
    print.newline();
    
    if (!isLast && !path.parentPath.isIfStatement())
        print.indent();
};

export const printTrailingCommentLine = (path, printer, semantics, {isSameLine, printComment}) => {
    const {print} = printer;
    
    if (isSameLine)
        print.space();
    else
        print.breakline();
    
    printComment();
    
    if (isNext(path) || isInsideBlock(path))
        print.newline();
};

const isSimple = createTypeChecker([
    '+: node.expression -> StringLiteral',
    '+: node.expression -> TemplateLiteral',
    '+: node.expression -> ArrayExpression',
    '+: node.expression -> BooleanLiteral',
]);

export const isNextSimple = callWithNext(isSimple);

export const printLeadingCommentBlock = (path, printer, semantics, {printComment}) => {
    const {indent} = printer;
    const prev = path.getPrevSibling();
    
    if (hasTrailingComment(prev))
        return;
    
    if (isBlockStatement(path.parentPath) && !isProgram(path.parentPath.parentPath))
        indent();
    
    printComment();
};

export const printTrailingCommentBlock = (path, printer, semantics, {printComment, isSameLine}) => {
    const {maybe, print} = printer;
    
    if (isNext(path))
        print.breakline();
    
    maybe.print.space(isSameLine);
    printComment();
};
