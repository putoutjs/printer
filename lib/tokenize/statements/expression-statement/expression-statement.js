import {createTypeChecker} from '#type-checker';
import {
    isNext,
    isLast,
    isNewlineBetweenSiblings,
    noTrailingComment,
    hasTrailingComment,
    isCoupleLines,
    isInsideReturn,
    getNext,
    hasLeadingComment,
} from '#is';
import {
    printLeadingCommentLine,
    printLeadingCommentBlock,
} from './comments.js';
import {afterIf} from './after-if.js';
import {beforeIf} from './before-if.js';

const isCallInsideExpression = createTypeChecker([
    '-: -> !ExpressionStatement',
    '+: node.expression -> CallExpression',
]);

const isNextToAssignmentCall = createTypeChecker([
    '-: node.expression -> AssignmentExpression',
    ['+', getNext(isCallInsideExpression)],
]);

const isNextStatementWithBlockComment = createTypeChecker([
    '-: node.expression -> !CallExpression',
    '-: node.expression.arguments.0 -> !CallExpression',
    '+: node.trailingComments.0 -> CommentBlock',
]);

const isBreaklineAfter = createTypeChecker([
    ['-: -> !', hasTrailingComment],
    ['-: -> !', isLast],
    ['+', isCoupleLines],
]);

const isNextIf = (path) => path
    .getNextSibling()
    .isIfStatement();

const isBreakline = createTypeChecker([
    isNewlineBetweenSiblings,
    isNextIf,
]);

const isIndent = createTypeChecker([
    noTrailingComment,
    isNextToAssignmentCall,
    isNextStatementWithBlockComment,
]);

export const isIndentAfter = createTypeChecker([
    '-: node.expression -> !AssignmentExpression',
    ['+', getNext(hasLeadingComment)],
]);

export const ExpressionStatement = {
    beforeIf,
    before(path, {indent}) {
        indent();
    },
    print(path, {print, maybe, store}) {
        const insideReturn = isInsideReturn(path);
        
        print('__expression');
        maybe.print(!insideReturn, ';');
        
        if (!isNext(path))
            return;
        
        if (isBreakline(path)) {
            print.newline();
            maybe.indent(isIndent(path));
            store(true);
        }
    },
    afterIf,
    after(path, {print, maybe, store}) {
        maybe.print.breakline(isBreaklineAfter(path));
        
        if (isInsideReturn(path))
            return;
        
        maybe.indent(isIndentAfter(path));
        print.newline();
        maybe.markAfter(store(), path);
    },
};
ExpressionStatement.printLeadingCommentLine = printLeadingCommentLine;
ExpressionStatement.printLeadingCommentBlock = printLeadingCommentBlock;
