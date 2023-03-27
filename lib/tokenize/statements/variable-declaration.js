'use strict';

const {
    isNext,
    isCoupleLines,
    isNextBlock,

} = require('../is');
const {
    hasPrevNewline,
    markAfter,
} = require('../mark');

const isParentBlock = (path) => /Program|BlockStatement/.test(path.parentPath.type);

module.exports.VariableDeclaration = (path, {maybe, print}) => {
    if (shouldAddNewlineBefore(path))
        print.breakline();
    
    maybe.indent(isParentBlock(path));
    print(`${path.node.kind} `);
    print('__declarations.0.id');
    
    const initPath = path.get('declarations.0.init');
    
    maybe.print(initPath.node, ' = ');
    print(initPath);
    maybe.print(isParentBlock(path), ';');
    let wasNewline = false;
    
    if (isParentBlock(path) && isNext(path)) {
        print.newline();
        wasNewline = true;
    }
    
    if (shouldAddNewlineAfter(path)) {
        maybe.print.linebreak(wasNewline);
        maybe.print.newline(!wasNewline);
        markAfter(path);
    }
};

function shouldAddNewlineAfter(path) {
    if (!isNext(path) && path.parentPath.isBlockStatement())
        return true;
    
    if (isNextBlock(path))
        return false;
    
    if (isLast(path))
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

