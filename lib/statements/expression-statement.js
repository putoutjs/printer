'use strict';

module.exports.ExpressionStatement = (path, {write, indent, traverse}) => {
    if (isCoupleLinesExpression(path))
        write('\n');
    
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
