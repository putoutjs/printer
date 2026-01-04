import {types} from '@putout/babel';
import {
    isNext,
    isLast,
    isParentBlock,
    isParentLast,
    isNewlineBetweenSiblings,
    satisfy,
    noTrailingComment,
    hasTrailingComment,
    isCoupleLines,
    isInsideLabel,
} from '../../is.js';
import {isInsideAssignNextAssignFunction} from './is-inside-assign-next-assign-function.js';
import {
    printLeadingCommentLine,
    printLeadingCommentBlock,
} from './expression-statement-comments.js';

const isCommentBlock = (a) => a?.type === 'CommentBlock';

const {
    isCallExpression,
    isExpressionStatement,
    isAssignmentExpression,
} = types;

const not = (fn) => (...a) => !fn(...a);

const isBeforeElse = (path) => {
    if (!path.parentPath.isIfStatement())
        return false;
    
    if (path !== path.parentPath.get('consequent'))
        return false;
    
    return Boolean(path.parentPath.node.alternate);
};

const isInsideReturn = ({parentPath}) => parentPath.isReturnStatement();
const notInsideReturn = not(isInsideReturn);

const satisfyAfter = satisfy([
    isNotLastOrParentLast,
    isParentBlock,
    isNext,
    isNextUp,
]);

const isNextIf = (path) => path
    .getNextSibling()
    .isIfStatement();

const shouldBreakline = satisfy([
    isNewlineBetweenSiblings,
    isNotLastBody,
    isNextIf,
]);

export const ExpressionStatement = {
    beforeIf(path) {
        if (isInsideReturn(path))
            return false;
        
        return !isInsideLabel(path);
    },
    before(path, {indent}) {
        indent();
    },
    print(path, {print, maybe, store, indent}) {
        const insideReturn = isInsideReturn(path);
        
        print('__expression');
        maybe.print(!insideReturn, ';');
        
        if (!isNext(path))
            return;
        
        if (!insideReturn && shouldBreakline(path)) {
            print.newline();
            
            const condition = isNext(path)
                && noTrailingComment(path)
                || isNextToAssignmentCall(path)
                || isNextStatementWithBlockComment(path);
            
            if (condition)
                indent();
            
            store(true);
        }
    },
    afterIf: (path) => {
        if (satisfyAfter(path))
            return true;
        
        if (hasTrailingComment(path) && isLast(path))
            return true;
        
        return isBeforeElse(path);
    },
    after(path, {print, maybe, store, indent}) {
        if (hasTrailingComment(path) && isLast(path) && isCoupleLines(path))
            print.breakline();
        
        if (hasTrailingComment(path) && !isCoupleLines(path))
            return;
        
        if (isTopParentLast(path))
            return;
        
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

function isTopParentLast({parentPath}) {
    if (!parentPath.isIfStatement())
        return false;
    
    const nextParent = parentPath.parentPath;
    
    if (!nextParent.isIfStatement())
        return false;
    
    const nextNext = nextParent.parentPath;
    
    if (!nextNext.isIfStatement())
        return false;
    
    return isLast(nextNext);
}

function isNotLastBody(path) {
    return path.parentPath.get('body') === path;
}

function isNotLastOrParentLast(path) {
    return !isLast(path) && !isParentLast(path);
}

function isNextUp(path) {
    return path.findParent(isNext);
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
