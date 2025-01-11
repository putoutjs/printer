'use strict';

const {types} = require('@putout/babel');
const {
    isNext,
    isCoupleLines,
    isNewlineBetweenSiblings,
    exists,
    noTrailingComment,
} = require('../../is');

const {hasPrevNewline} = require('../../mark');

const {maybeSpaceAfterKeyword} = require('./maybe-space-after-keyword');

const {isConcatenation} = require('../../expressions/binary-expression/concatenate');
const {parseLeadingComments} = require('../../comment/comment');
const {maybeDeclare} = require('../../maybe/maybe-declare');
const {isExportDeclaration} = types;
const isParentTSModuleBlock = (path) => path.parentPath.isTSModuleBlock();
const isParentBlock = (path) => /Program|BlockStatement|Export|LabeledStatement/.test(path.parentPath.type);
const isInsideBlock = (path) => /^(Program|BlockStatement|TSModuleBlock|SwitchCase)$/.test(path.parentPath.type);
const isParentSwitchCase = (path) => path.parentPath.isSwitchCase();
const isFirstInSwitch = (path) => path.parentPath.get('consequent.0') === path;
const isParentIf = (path) => path.parentPath.isIfStatement();

module.exports.VariableDeclaration = {
    beforeIf: shouldAddNewlineBefore,
    before(path, {print}) {
        print.breakline();
    },
    print: maybeDeclare((path, {maybe, store, write, traverse, print, indent}, semantics) => {
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
            const isLast = index === n;
            
            traverse(id);
            
            if (exists(init)) {
                write.space();
                write('=');
                maybe.write.space(!isConcatenation(init));
                traverse(init);
            }
            
            if (!isLast) {
                const next = declarations[index + 1];
                
                write(',');
                
                if (!next.node.leadingComments) {
                    maybe.write.breakline(n > maxVariablesInOneLine);
                    maybe.write.space(n <= maxVariablesInOneLine);
                    continue;
                }
                
                parseLeadingComments(next, {print, maybe, indent}, semantics);
            }
        }
        
        maybe.indent.dec(n);
        
        if (isParentBlock(path) || isParentSwitchCase(path) || isParentTSModuleBlock(path) || isParentIf(path))
            write(';');
        
        let wasNewline = false;
        
        if (isParentSwitchCase(path) && !isFirstInSwitch(path)) {
            write.newline();
            wasNewline = true;
        } else if (isParentSwitchCase(path)) {
            write.newline();
        }
        
        if (isParentBlock(path) && isNext(path) && (noTrailingComment(path) || isNewlineBetweenSiblings(path))) {
            write.newline();
            wasNewline = true;
        }
        
        store(wasNewline);
    }),
    afterSatisfy: () => [
        isNextIf,
        noNextParentBlock,
        notLastCoupleLines,
        isNextAssign,
        isNextCoupleLines,
        notLastPrevVarNotNextVar,
        isNewlineBetweenSiblings,
        notLastParentExport,
        isParentTSModuleBlock,
    ],
    after(path, {maybe, store}) {
        const wasNewline = store();
        
        if (isLast(path.parentPath) && !path.parentPath.isBlockStatement() || !isParentBlock(path) && !isParentTSModuleBlock(path))
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
    
    if (!exists(prev.getPrevSibling()))
        return false;
    
    if (path.node.loc?.start.line === prev.node?.loc?.start.line + 2)
        return false;
    
    return !isLast(path) && prev.isVariableDeclaration() && !next.isVariableDeclaration();
}

function isNextCoupleLines(path) {
    const next = path.getNextSibling();
    const prev = path.getPrevSibling();
    
    if (!exists(prev.getPrevSibling()) && next.isVariableDeclaration())
        return false;
    
    if (path.node.loc?.start.line === prev.node?.loc?.start?.line + 2)
        return false;
    
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
    
    return !isExportDeclaration(path.parentPath) && isCoupleLines(path);
}

function isFirst(path) {
    return path.node === path.parentPath.node.body?.[0];
}

const isNextIf = (path) => {
    const nextPath = path.getNextSibling();
    return nextPath.isIfStatement();
};

const isNextAssign = (path) => {
    const nextPath = path.getNextSibling();
    
    if (!nextPath.isExpressionStatement())
        return false;
    
    const {parentPath} = path;
    
    if (parentPath.isBlockStatement() && parentPath.node.body.length < 3)
        return false;
    
    return nextPath.get('expression').isAssignmentExpression();
};
