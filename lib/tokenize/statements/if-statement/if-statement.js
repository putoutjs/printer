import {types} from '@putout/babel';
import {markAfter} from '#mark';
import {createTypeChecker} from '#type-checker';
import {
    exists,
    isNext,
    isInsideIf,
    hasEmptyBody,
    isInsideBlock,
} from '#is';
import {
    printTrailingCommentBlock,
    printTrailingCommentLine,
} from './if-statement-comments.js';

const {
    isBlockStatement,
    isStatement,
    isExpressionStatement,
    isReturnStatement,
    isContinueStatement,
} = types;

const isStatementNotExpression = (path) => {
    if (isBlockStatement(path))
        return false;
    
    if (isReturnStatement(path))
        return false;
    
    if (isContinueStatement(path))
        return false;
    
    return !isExpressionStatement(path);
};

const isInsideNestedBody = createTypeChecker([
    ['-: -> !', isInsideBlock],
    '+: parentPath.parentPath -> BlockStatement',
]);

const isTopLevel = ({parentPath}) => parentPath.parentPath.isProgram();
const isEmptyConsequent = (path) => path.get('consequent').isEmptyStatement();
const isBlockConsequent = (path) => isBlockStatement(path.node.consequent);
const isConsequentHasBody = (path) => path.node.consequent.body.length;

const isLastEmptyInsideBody = createTypeChecker([
    ['-: -> !', isInsideBlock],
    ['-: -> !', isBlockConsequent],
    ['-', isConsequentHasBody],
    '+: parentPath.parentPath -> FunctionDeclaration',
]);

export const IfStatement = {
    printTrailingCommentBlock,
    printTrailingCommentLine,
    print: (path, {indent, print, maybe, write, traverse}) => {
        const {parentPath} = path;
        const partOfAlternate = parentPath.get('alternate');
        
        if (path !== partOfAlternate)
            indent();
        
        print('if');
        print.space();
        print('(');
        print('__test');
        print(')');
        
        const consequent = path.get('consequent');
        const alternate = path.get('alternate');
        const isConsequentBlock = consequent.isBlockStatement();
        const isVar = consequent.isVariableDeclaration();
        
        if (isConsequentBlock) {
            print.space();
            print(consequent);
            
            if (isInsideIf(path.parentPath) || isInsideNestedBody(path))
                maybe.print.newline(hasEmptyBody(consequent));
        } else {
            const is = !isEmptyConsequent(path);
            
            maybe.print.newline(is);
            maybe.indent.inc(is);
            maybe.indent(isVar);
            print(consequent);
            maybe.indent.dec(is);
        }
        
        if (alternate.isBlockStatement()) {
            write.space();
            write('else');
            write.space();
            traverse(alternate);
        } else if (alternate.isIfStatement()) {
            if (alternate.get('consequent').isBlockStatement()) {
                write.space();
            } else {
                maybe.write.newline(isStatementNotExpression(consequent));
                indent();
            }
            
            write('else ');
            traverse(alternate);
        } else if (exists(alternate)) {
            maybe.write.newline(isVar || isStatementNotExpression(consequent));
            maybe.indent(!isConsequentBlock);
            maybe.write.space(isConsequentBlock);
            write('else');
            write.splitter();
            indent.inc();
            traverse(alternate);
            indent.dec();
        }
        
        if (!isNext(path) && !consequent.isBlockStatement())
            return;
        
        const nextPath = path.parentPath.getNextSibling();
        
        if (path === partOfAlternate && !isTopLevel(path) && !isStatement(nextPath))
            print.newline();
        
        if (isLastEmptyInsideBody(path))
            print.newline();
    },
    afterSatisfy: () => [
        isNext,
    ],
    after: (path, {print}) => {
        print.linebreak();
        markAfter(path);
    },
};
