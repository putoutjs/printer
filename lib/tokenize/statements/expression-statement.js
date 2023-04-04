'use strict';

const {
    isNext,
    isParentProgram,
    isLast,
    isParentBlock,
    isCoupleLines,
    isNextCoupleLines,
    isParentLast,
} = require('../is');

const isNextDifferent = (path) => {
    const next = path.getNextSibling();
    
    if (!next.isExpressionStatement())
        return true;
    
    return next.node.expression.type !== path.node.expression.type;
};

module.exports.ExpressionStatement = {
    print(path, {indent, print, maybe, store}) {
        indent();
        print('__expression');
        print(';');
        
        if (shouldBreakline(path)) {
            print.newline();
            maybe.indent(isNext(path));
            store(true);
        }
    },
    afterIf(path) {
        return shouldAddNewLineAfter(path);
    },
    after(path, {print, maybe, store}) {
        print.newline();
        maybe.markAfter(store(), path);
    },
};

function shouldBreakline(path) {
    if (isLast(path) || isParentLast(path))
        return false;
    
    if (!isNext(path) && isParentBlock(path))
        return false;
    
    if (path.parentPath.get('body') === path)
        return true;
    
    if (isStrictMode(path))
        return true;
    
    if (isNext(path) && isNextDifferent(path) && path.parentPath.node.body?.length > 2)
        return true;
    
    if (isCoupleLines(path) || isNextCoupleLines(path))
        return true;
    
    return false;
}

function shouldAddNewLineAfter(path) {
    if (!isParentBlock(path) && (isLast(path) || isParentLast(path)))
        return false;
    
    if (isParentBlock(path) && !isParentProgram(path))
        return true;
    
    if (isNext(path))
        return true;
    
    return path.findParent(isNext);
}

function isStrictMode(path) {
    const expressionPath = path.get('expression');
    
    if (!expressionPath.isStringLiteral())
        return false;
    
    const {value} = path.node.expression;
    
    return value === 'use strict';
}

