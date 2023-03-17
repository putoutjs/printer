'use strict';

const {isNext} = require('../is');
const isNextAssign = (path) => {
    const nextPath = path.getNextSibling();
    
    if (!nextPath.isExpressionStatement())
        return false;
    
    return nextPath.get('expression').isAssignmentExpression();
};

module.exports.VariableDeclaration = (path, {write, maybe, maybeIndent, traverse}) => {
    if (!isFirst(path) && shouldAddNewLine(path)) {
        write.linebreak();
    }
    
    const isParentBlock = /Program|BlockStatement/.test(path.parentPath.type);
    
    maybeIndent(isParentBlock);
    write(`${path.node.kind} `);
    traverse(path.get('declarations.0.id'));
    
    const initPath = path.get('declarations.0.init');
    
    maybe.write(initPath.node, ' = ');
    traverse(initPath);
    maybe.write(isParentBlock, ';\n');
    
    const is = isNext(path) && isCoupleLinesExpression(path) && !isNextAssign(path);
    
    maybe.indent(is);
    maybe.write(is, '\n');
    maybe.markAfter(is, path);
};
function isCoupleLinesExpression(path) {
    const start = path.node?.loc?.start.line;
    const end = path.node?.loc?.end.line;
    
    return end > start;
}

function shouldAddNewLine(path) {
    debugger;
    const prevPath = path.getPrevSibling();
    
    if (prevPath.isStatement() && !prevPath.isExpressionStatement() && !prevPath.isBlockStatement())
        return false;
    
    if (prevPath.isExpressionStatement() && prevPath.get('expression').isStringLiteral())
        return false;
    
    if (isCoupleLinesExpression(path))
        return true;
    
    const nextPath = path.getNextSibling();
    const nextNextPath = nextPath.getNextSibling();
    
    const twoNext = nextPath.node && nextNextPath.node;
    
    if (!twoNext)
        return false;
    
    return true;
}

function isFirst(path) {
    return path.node === path.parentPath.node.body[0];
}
