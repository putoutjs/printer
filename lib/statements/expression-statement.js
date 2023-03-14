'use strict';

module.exports.ExpressionStatement = (path, {write, indent, traverse}) => {
    if (isCoupleLinesExpression(path) && !isFirst(path) && shouldAddNewLine(path)) {
        indent();
        write('\n');
    }
    
    const expressionPath = path.get('expression');
    
    indent();
    traverse(expressionPath);
    write(';\n');
    
    if (isStrictMode(expressionPath))
        write('\n');
};

function isCoupleLinesExpression(path) {
    const start = path.node.loc?.start.line;
    const end = path.node.loc?.end.line;
    
    return end > start;
}

function isStrictMode(path) {
    if (!path.isStringLiteral())
        return false;
    
    const {value} = path.node;
    
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
    
    return true;
}
