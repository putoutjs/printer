import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {
    isNext,
    isLast,
    isNewlineBetweenSiblings,
    satisfy,
    noTrailingComment,
    hasTrailingComment,
    isCoupleLines,
    isInsideLabel,
    isInsideReturn,
} from '#is';
import {isInsideAssignNextAssignFunction} from './is-inside-assign-next-assign-function.js';
import {
    printLeadingCommentLine,
    printLeadingCommentBlock,
} from './comments.js';
import {afterIf} from './after-if.js';
import {beforeIf} from './before-if.js';

const isCommentBlock = (a) => a?.type === 'CommentBlock';
const isBreakline = createTypeChecker([
    ['-: -> !', hasTrailingComment],
    ['-: -> !', isLast],
    ['+', isCoupleLines],
]);

const {
    isCallExpression,
    isExpressionStatement,
    isAssignmentExpression,
} = types;

const not = (fn) => (...a) => !fn(...a);

const notInsideReturn = not(isInsideReturn);

const isNextIf = (path) => path
    .getNextSibling()
    .isIfStatement();

const shouldBreakline = satisfy([
    isNewlineBetweenSiblings,
    isNotLastBody,
    isNextIf,
]);

const isIndent = createTypeChecker([
    noTrailingComment,
    isNextToAssignmentCall,
    isNextStatementWithBlockComment,
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
        
        if (!insideReturn && shouldBreakline(path)) {
            print.newline();
            maybe.indent(isIndent(path));
            store(true);
        }
    },
    afterIf,
    after(path, {print, maybe, store, indent}) {
        maybe.print.breakline(isBreakline(path));
        
        if (notInsideReturn(path)) {
            if (isInsideAssignNextAssignFunction(path))
                indent();
            
            print.newline();
            maybe.markAfter(store(), path);
        }
    },
};
ExpressionStatement.printLeadingCommentLine = printLeadingCommentLine;
ExpressionStatement.printLeadingCommentBlock = printLeadingCommentBlock;

function isNotLastBody(path) {
    return path.parentPath.get('body') === path;
}

function isNextToAssignmentCall(path) {
    if (isAssignmentExpression(path.node.expression))
        return false;
    
    const nextPath = path.getNextSibling();
    
    if (!isExpressionStatement(nextPath))
        return false;
    
    const {expression} = nextPath.node;
    
    return isCallExpression(expression);
}

function isNextStatementWithBlockComment(path) {
    const {expression} = path.node;
    
    if (!isCallExpression(expression))
        return false;
    
    if (!isCallExpression(expression.arguments[0]))
        return false;
    
    return hasTrailingBlock(path);
}

function hasTrailingBlock(path) {
    const {trailingComments} = path.node;
    const [first] = trailingComments;
    
    return isCommentBlock(first);
}
