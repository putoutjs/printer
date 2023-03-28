'use strict';

const {
    markBefore,
    hasPrevNewline,
} = require('../mark');

const {
    isNext,
    isParentProgram,
    isLast,
    isParentBlock,
} = require('../is');

const isNextDifferent = (path) => {
    const next = path.getNextSibling();
    
    if (!next.isExpressionStatement())
        return true;
    
    return next.node.expression.type !== path.node.expression.type;
};

module.exports.ExpressionStatement = (path, {indent, print, maybe}) => {
    if (isCoupleLinesExpression(path) && !isFirst(path) && shouldAddNewlineBefore(path) && !hasPrevNewline(path)) {
        print.breakline();
        markBefore(path);
    }
    
    indent();
    print('__expression');
    print(';');
    
    let wasNewline = false;
    
    if (shouldBreakline(path)) {
        print.newline();
        maybe.indent(isNext(path));
        
        wasNewline = true;
    }
    
    if (shouldAddNewLineAfter(path)) {
        print.newline();
        maybe.markAfter(wasNewline, path);
    }
};

function shouldBreakline(path) {
    if (isLast(path) || isLast(path.parentPath))
        return false;
    
    if (!isNext(path) && isParentBlock(path))
        return false;
    
    if (path.parentPath.get('body') === path)
        return true;
    
    if (isStrictMode(path) || isCoupleLinesExpression(path))
        return true;
    
    if (isNext(path) && isNextDifferent(path) && path.parentPath.node.body?.length > 2)
        return true;
    
    return false;
}

function shouldAddNewLineAfter(path) {
    if (isLast(path))
        return false;
    
    if (isParentBlock(path) && !isParentProgram(path))
        return true;
    
    if (isNext(path))
        return true;
    
    return false;
}

function isCoupleLinesExpression(path) {
    const start = path.node.loc?.start?.line;
    const end = path.node.loc?.end?.line;
    
    return end > start;
}

function isStrictMode(path) {
    const expressionPath = path.get('expression');
    
    if (!expressionPath.isStringLiteral())
        return false;
    
    const {value} = path.node.expression;
    
    return value === 'use strict';
}

function isFirst(path) {
    return path.node === path.parentPath.node.body[0];
}

function shouldAddNewlineBefore(path) {
    const prev = path.getPrevSibling();
    
    if (prev.isVariableDeclaration())
        return false;
    
    if (prev.isIfStatement())
        return false;
    
    if (isStrictMode(prev))
        return false;
    
    return true;
}
