'use strict';

const {
    markBefore,
    markAfter,
    hasPrevNewline,
} = require('../mark');

const {
    isNext,
    isProgramParent,
    isNextParent,

} = require('../is');

module.exports.ExpressionStatement = (path, {indent, print}) => {
    if (isCoupleLinesExpression(path) && !isFirst(path) && shouldAddNewlineBefore(path) && !hasPrevNewline(path)) {
        print.breakline();
        markBefore(path);
    }
    
    indent();
    print('__expression');
    print(';');
    
    if (isNext(path) || isNextParent(path) || path.parentPath.isBlockStatement() && !isProgramParent(path)) {
        print.newline();
    }
    
    if (shouldAddNewLineAfter(path)) {
        print.newline();
        markAfter(path);
    }
};

function shouldAddNewLineAfter(path) {
    if (!isNext(path))
        return false;
    
    if (isStrictMode(path) || isCoupleLinesExpression(path))
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
