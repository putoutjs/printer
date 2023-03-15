'use strict';

module.exports.ExpressionStatement = (path, {write, indent, traverse}) => {
    if (isCoupleLinesExpression(path) && !isFirst(path) && shouldAddNewLine(path)) {
        write.linebreak();
    }
    
    const expressionPath = path.get('expression');
    
    indent();
    traverse(expressionPath);
    write(';');
    write.newline();
    
    if (isStrictMode(path))
        write.newline();
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
