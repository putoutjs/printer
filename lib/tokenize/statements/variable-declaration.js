'use strict';

const {isNext, isCoupleLines} = require('../is');
const {hasPrevNewline, markAfter} = require('../mark');
const isNextAssign = (path) => {
    const nextPath = path.getNextSibling();
    
    if (!nextPath.isExpressionStatement())
        return false;
    
    return nextPath.get('expression').isAssignmentExpression();
};

module.exports.VariableDeclaration = (path, {write, maybe, maybeIndent, traverse, print, indent}) => {
    if (!isFirst(path) && shouldAddNewLine(path) && !hasPrevNewline(path))
        print.linebreak();
    
    const isParentBlock = /Program|BlockStatement/.test(path.parentPath.type);
    
    maybe.indent(isParentBlock);
    print(`${path.node.kind} `);
    print(path.get('declarations.0.id'));
    
    const initPath = path.get('declarations.0.init');
    
    maybe.print(initPath.node, ' = ');
    print(initPath);
    maybe.print(isParentBlock, ';');
    maybe.print.newline(isParentBlock);
    
    const is = isNext(path) && isCoupleLines(path) && !isNextAssign(path);
    
    if (is) {
        print.indent();
        print.newline();
        markAfter(path);
    }
};

function shouldAddNewLine(path) {
    const prevPath = path.getPrevSibling();
    
    if (prevPath.isStatement() && !prevPath.isExpressionStatement() && !prevPath.isBlockStatement())
        return false;
    
    if (prevPath.isExpressionStatement() && prevPath.get('expression').isStringLiteral())
        return false;
    
    if (isCoupleLines(path))
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

