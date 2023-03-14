'use strict';

module.exports.VariableDeclaration = (path, {indent, write, maybeWrite, maybeIndent, traverse}) => {
    if (!isFirst(path) && shouldAddNewLine(path)) {
        write('\n');
    }
    
    indent();
    write(`${path.node.kind} `);
    traverse(path.get('declarations.0.id'));
    write(' = ');
    traverse(path.get('declarations.0.init'));
    write(';\n');
    
    const is = isCoupleLinesExpression(path);
    
    maybeIndent(is);
    maybeWrite(is, '\n');
};
function isCoupleLinesExpression(path) {
    const start = path.node.loc?.start.line;
    const end = path.node.loc?.end.line;
    
    return end > start;
}

function shouldAddNewLine(path) {
    const nextPath = path.getNextSibling();
    const nextNextPath = path.getNextSibling();
    
    const twoNext = nextPath.node && nextNextPath.node;
    
    if (!twoNext)
        return false;
    
    const prevPath = path.getPrevSibling();
    
    if (prevPath.isVariableDeclaration() || prevPath.isExpressionStatement() && prevPath.get('expression').isStringLiteral())
        return false;
    
    if (prevPath.isIfStatement())
        return false;
    
    return true;
}

function isFirst(path) {
    return path.node === path.parentPath.node.body[0];
}
