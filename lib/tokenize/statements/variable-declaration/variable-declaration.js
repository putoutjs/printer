'use strict';

const {
    isNext,
    isCoupleLines,
    isNewlineBetweenSiblings,
    exists,
    noTrailingComment,
} = require('../../is');

const {hasPrevNewline} = require('../../mark');
const {isExportDeclaration} = require('@babel/types');
const {maybeSpaceAfterKeyword} = require('./maybe-space-after-keyword');

const {isConcatenation} = require('../../expressions/binary-expression/concatanate');
const {parseLeadingComments} = require('../../comments');

const isParentBlock = (path) => /Program|BlockStatement|Export/.test(path.parentPath.type);
const isInsideBlock = (path) => /^(Program|BlockStatement)$/.test(path.parentPath.type);

module.exports.VariableDeclaration = {
    beforeIf: shouldAddNewlineBefore,
    before(path, {print}) {
        print.breakline();
    },
    print(path, {maybe, store, write, traverse, print, indent}, semantics) {
        const {maxVariablesInOneLine} = semantics;
        maybe.indent(isInsideBlock(path));
        write(path.node.kind);
        maybeSpaceAfterKeyword(path, {
            write,
        });
        
        const declarations = path.get('declarations');
        const n = declarations.length - 1;
        
        maybe.indent.inc(n);
        
        for (const [index, declaration] of declarations.entries()) {
            const id = declaration.get('id');
            const init = declaration.get('init');
            const notLast = index < n;
            
            traverse(id);
            
            if (exists(init)) {
                write.space();
                write('=');
                maybe.write.space(!isConcatenation(init));
                traverse(init);
            }
            
            if (notLast) {
                const next = declarations[index + 1];
                
                write(',');
                
                if (!next.node.leadingComments) {
                    maybe.write.breakline(n > maxVariablesInOneLine);
                    maybe.write.space(n <= maxVariablesInOneLine);
                    continue;
                }
                
                parseLeadingComments(next, {
                    print,
                    maybe,
                    indent,
                }, semantics);
            }
        }
        
        maybe.indent.dec(n);
        maybe.write(isParentBlock(path), ';');
        
        let wasNewline = false;
        
        if (isParentBlock(path) && isNext(path) && (noTrailingComment(path) || isNewlineBetweenSiblings(path))) {
            write.newline();
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
        isNewlineBetweenSiblings,
        notLastParentExport,
    ],
    after(path, {maybe, store}) {
        const wasNewline = store();
        
        if (isLast(path.parentPath) && !path.parentPath.isBlockStatement())
            return false;
        
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
        .get('expression')
        .isAssignmentExpression();
};
