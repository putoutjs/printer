'use strict';

const {
    isNext,
    isCoupleLines,
} = require('../is');
const {
    hasPrevNewline,
    markAfter,
} = require('../mark');

module.exports.VariableDeclaration = (path, {maybe, print}) => {
    if (shouldAddNewlineBefore(path))
        print.breakline();
    
    const isParentBlock = /Program|BlockStatement/.test(path.parentPath.type);
    
    maybe.indent(isParentBlock);
    print(`${path.node.kind} `);
    print('__declarations.0.id');
    
    const initPath = path.get('declarations.0.init');
    
    maybe.print(initPath.node, ' = ');
    print(initPath);
    maybe.print(isParentBlock, ';');
    maybe.print.newline(isParentBlock);
    
    const is = shouldAddNewlineAfter(path);
    
    if (is) {
        print.linebreak();
        markAfter(path);
    }
};

function shouldAddNewlineAfter(path) {
    if (isLast(path))
        return true;
    
    if (!isNext(path))
        return false;
    
    if (isCoupleLines(path))
        return true;
    
    if (isNextAssign(path))
        return true;
    
    if (isCoupleLines(path.getNextSibling()))
        return true;
    
    return false;
}

const isLast = (path) => path.parentPath.isProgram() && !isNext(path);

function shouldAddNewlineBefore(path) {
    if (isFirst(path))
        return false;
    
    if (hasPrevNewline(path))
        return false;
    
    if (hasPrevNewline(path.parentPath))
        return false;
    
    const prevPath = path.getPrevSibling();
    
    if (prevPath.isStatement() && !prevPath.isExpressionStatement() && !prevPath.isBlockStatement())
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
const isNextAssign = (path) => {
    const nextPath = path.getNextSibling();
    
    if (!nextPath.isExpressionStatement())
        return false;
    
    return nextPath.get('expression').isAssignmentExpression();
};

