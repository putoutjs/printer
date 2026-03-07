import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {
    isNext,
    isLast,
    isNewlineBetweenSiblings,
    noTrailingComment,
    hasTrailingComment,
    isCoupleLines,
    isInsideReturn,
    callWithNext,
    hasLeadingComment,
} from '#is';
import {
    printLeadingCommentLine,
    printLeadingCommentBlock,
} from './comments.js';
import {afterIf} from './after-if.js';
import {beforeIf} from './before-if.js';

const {isIfStatement} = types;

const isCallInsideExpression = createTypeChecker([
    '-: -> !ExpressionStatement',
    '+: node.expression -> CallExpression',
]);

const isNextToAssignmentCall = createTypeChecker([
    ['-: node.expression -> AssignmentExpression'],
    ['+', callWithNext(isCallInsideExpression)],
]);

const isBreaklineAfter = createTypeChecker([
    ['-: -> !', hasTrailingComment],
    ['-: -> !', isLast],
    ['+', isCoupleLines],
]);

const isNextStatementWithBlockComment = createTypeChecker([
    '-: node.expression -> !CallExpression',
    '-: node.expression.arguments.0 -> !CallExpression',
    '+: node.trailingComments.0 -> CommentBlock',
]);

const isBreakline = createTypeChecker([
    ['+', isNewlineBetweenSiblings],
    ['+', callWithNext(isIfStatement)],
]);

const isIndent = createTypeChecker([
    noTrailingComment,
    isNextToAssignmentCall,
    isNextStatementWithBlockComment,
]);

export const isIndentAfter = createTypeChecker([
    ['-: node.expression -> !AssignmentExpression'],
    ['+', callWithNext(hasLeadingComment)],
]);

export const ExpressionStatement = {
    printLeadingCommentLine,
    printLeadingCommentBlock,
    beforeIf,
    before(path, {indent}) {
        indent();
    },
    print(path, {print, maybe, store}) {
        print('__expression');
        maybe.print(!isInsideReturn(path), ';');
        
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

