'use strict';

module.exports.VariableDeclaration = (path, {write, maybeWrite, maybeIndent, traverse}) => {
    if (!isFirst(path) && shouldAddNewLine(path)) {
        write('\n');
    }
    
    const isParentBlock = /Program|BlockStatement/.test(path.parentPath.type);
    
    maybeIndent(isParentBlock);
    write(`${path.node.kind} `);
    traverse(path.get('declarations.0.id'));
    
    const initPath = path.get('declarations.0.init');
    
    maybeWrite(initPath.node, ' = ');
    traverse(initPath);
    maybeWrite(isParentBlock, ';\n');
    
    const is = isCoupleLinesExpression(path);
    
    maybeIndent(is);
    maybeWrite(is, '\n');
};
function isCoupleLinesExpression(path) {
    const start = path.node?.loc?.start.line;
    const end = path.node?.loc?.end.line;
    
    return end > start;
}

function shouldAddNewLine(path) {
    const prevPath = path.getPrevSibling();
    const nextPath = path.getNextSibling();
    const nextNextPath = nextPath.getNextSibling();
    
    const twoNext = nextPath.node && nextNextPath.node;
    
    if (!twoNext)
        return false;
    
    if (prevPath.isVariableDeclaration() || prevPath.isExpressionStatement() && prevPath.get('expression').isStringLiteral())
        return false;
    
    if (prevPath.isIfStatement())
        return false;
    
    return true;
}

function isFirst(path) {
    return path.node === path.parentPath.node.body[0];
}
