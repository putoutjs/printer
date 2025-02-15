'use strict';

const {
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
} = require('../../is');

const {isInsideAssignNextAssignFunction} = require('./is-inside-assign-next-assign-function');

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
    isStrictMode,
    isNextIf,
]);

module.exports.ExpressionStatement = {
    beforeIf(path) {
        if (isInsideReturn(path))
            return false;
        
        return !isInsideLabel(path);
    },
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
            maybe.indent(isNext(path) && noTrailingComment(path));
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

function isStrictMode(path) {
    const expressionPath = path.get('expression');
    
    if (!expressionPath.isStringLiteral())
        return false;
    
    const {value} = path.node.expression;
    
    return value === 'use strict';
}
