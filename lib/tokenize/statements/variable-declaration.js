'use strict';

const {
    isNext,
    isCoupleLines,
} = require('../is');

const {
    hasPrevNewline,
    markAfter,
} = require('../mark');

const isParentBlock = (path) => /Program|BlockStatement|Export/.test(path.parentPath.type);

module.exports.VariableDeclaration = {
    beforeIf: shouldAddNewlineBefore,
    before(path, {print}) {
        print.breakline();
    },
    print(path, {maybe, print, store}) {
        maybe.indent(isParentBlock(path));
        print(`${path.node.kind} `);
        print('__declarations.0.id');
        
        const initPath = path.get('declarations.0.init');
        maybe.print(initPath.node, ' = ');
        print('__declarations.0.init');
        maybe.print(isParentBlock(path), ';');
        
        let wasNewline = false;
        
        if (isParentBlock(path) && isNext(path)) {
            print.newline();
            wasNewline = true;
        }
        
        store(wasNewline);
    },
    afterIf: shouldAddNewlineAfter,
    after(path, {maybe, store}) {
        const wasNewline = store();
        maybe.print.linebreak(wasNewline);
        maybe.print.newline(!wasNewline);
        markAfter(path);
    },
};

function shouldAddNewlineAfter(path) {
    if (!isNext(path) && path.parentPath.isBlockStatement())
        return true;
    
    if (isLast(path))
        return false;
    
    if (isCoupleLines(path))
        return true;
    
    if (isNextAssign(path))
        return true;
    
    const next = path.getNextSibling();
    const prev = path.getPrevSibling();
    
    if (isCoupleLines(next))
        return true;
    
    if (prev.isVariableDeclaration() && !next.isVariableDeclaration())
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
}

function isFirst(path) {
    return path.node === path.parentPath.node.body?.[0];
}
const isNextAssign = (path) => {
    const nextPath = path.getNextSibling();
    
    if (!nextPath.isExpressionStatement())
        return false;
    
    return nextPath
        .get('expression').isAssignmentExpression();
};
