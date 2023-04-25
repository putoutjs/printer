'use strict';

const {
    isNext,
    isCoupleLines,
    isNewlineBetweenStatements,
} = require('../is');

const {hasPrevNewline} = require('../mark');

const {isExportDeclaration} = require('@babel/types');

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
    afterSatisfy: () => [
        noNextParentBlock,
        notLastCoupleLines,
        isNextAssign,
        isNextCoupleLines,
        notLastPrevVarNotNextVar,
        isNewlineBetweenStatements,
        notLastParentExport,
    ],
    after(path, {maybe, store}) {
        const wasNewline = store();
        maybe.print.linebreak(wasNewline);
        maybe.print.newline(!wasNewline);
        maybe.markAfter(wasNewline, path);
    },
};

function noNextParentBlock(path) {
    if (isNext(path))
        return false;
    
    return path.parentPath.isBlockStatement();
}

function notLastParentExport(path) {
    if (isLast(path.parentPath))
        return false;
    
    return path.parentPath.isExportDeclaration();
}

function notLastCoupleLines(path) {
    if (isLast(path))
        return false;
    
    return isCoupleLines(path);
}

function notLastPrevVarNotNextVar(path) {
    const prev = path.getPrevSibling();
    const next = path.getNextSibling();
    
    return !isLast(path) && prev.isVariableDeclaration() && !next.isVariableDeclaration();
}

function isNextCoupleLines(path) {
    const next = path.getNextSibling();
    
    return isCoupleLines(next);
}

const isLast = (path) => path.parentPath?.isProgram() && !isNext(path);

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
    
    if (!isExportDeclaration(path.parentPath) && isCoupleLines(path))
        return true;
    
    return false;
}

function isFirst(path) {
    return path.node === path.parentPath.node.body?.[0];
}

const isNextAssign = (path) => {
    const nextPath = path.getNextSibling();
    
    if (!nextPath.isExpressionStatement())
        return false;
    
    const {parentPath} = path;
    
    if (parentPath.isBlockStatement() && parentPath.node.body.length < 3)
        return false;
    
    return nextPath
        .get('expression').isAssignmentExpression();
};
