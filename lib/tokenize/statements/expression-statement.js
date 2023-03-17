'use strict';

const {
    markBefore,
    isMarkedBefore,
    isMarkedPrevBefore,
    markAfter,
    isMarkedPrevAfter,

} = require('../mark');
const {isNext} = require('../is');

module.exports.ExpressionStatement = (path, {write, indent, traverse}) => {
    if (isCoupleLinesExpression(path) && !isFirst(path) && shouldAddNewLine(path) && !isMarkedPrevAfter(path)) {
        write.linebreak();
        markBefore(path);
    }
    
    const expressionPath = path.get('expression');
    
    indent();
    traverse(expressionPath);
    write(';');
    write.newline();
    
    if (isStrictMode(path) || isCoupleLinesExpression(path) && isNext(path)) {
        write.newline();
        markAfter(path);
    }
};

function isCoupleLinesExpression(path) {
    const start = path.node.loc?.start.line;
    const end = path.node.loc?.end.line;
    
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

function shouldAddNewLine(path) {
    const prev = path.getPrevSibling();
    
    if (prev.isVariableDeclaration())
        return false;
    
    if (prev.isIfStatement())
        return false;
    
    if (isStrictMode(prev))
        return false;
    
    return true;
}
