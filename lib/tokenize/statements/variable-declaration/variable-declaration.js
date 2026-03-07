import {types} from '@putout/babel';
import {hasPrevNewline} from '#mark';
import {createTypeChecker} from '#type-checker';
import {
    isNext,
    isCoupleLines,
    isNewlineBetweenSiblings,
    exists,
    noTrailingComment,
    isInsideIf,
    isInsideBlock,
    isInsideExport,
    isInsideTSModuleBlock,
    isInsideProgram,
    isInsideSwitchCase,
    isInsideBody,
    callWithParent,
} from '#is';
import {maybeSpaceAfterKeyword} from './maybe-space-after-keyword.js';
import {isConcatenation} from '../../expressions/binary-expression/concatenate.js';
import {parseLeadingComments} from '../../comment/comment.js';
import {maybeDeclare} from '../../maybe/maybe-declare.js';

const {isExportDeclaration} = types;

const isInsideBlockLike = createTypeChecker([
    isInsideProgram,
    isInsideBlock,
    isInsideTSModuleBlock,
    isInsideSwitchCase,
    isInsideBody,
]);

const isLast = (path) => path.parentPath?.isProgram() && !isNext(path);

const isParentTSModuleBlock = (path) => path.parentPath.isTSModuleBlock();
const isParentSwitchCase = (path) => path.parentPath.isSwitchCase();
const isFirstInSwitch = (path) => path.parentPath.get('consequent.0') === path;

const isInsideParentLike = callWithParent(createTypeChecker([
    'Program',
    'BlockStatement',
    'ExportNamedDeclaration',
    'LabeledStatement',
]));

const isNeedSemicolon = createTypeChecker([
    isInsideParentLike,
    isParentSwitchCase,
    isParentTSModuleBlock,
    isInsideIf,
    isInsideBody,
]);

const isNeedNewline = createTypeChecker([
    ['-: -> !', isInsideParentLike],
    ['-: -> !', isNext],
    ['+', noTrailingComment],
    ['+', isNewlineBetweenSiblings],
]);

export const VariableDeclaration = {
    beforeIf: shouldAddNewlineBefore,
    before(path, {print}) {
        print.breakline();
    },
    print: maybeDeclare((path, {maybe, store, write, traverse, print, indent}, semantics) => {
        const {maxVariablesInOneLine} = semantics;
        
        maybe.indent(isInsideBlockLike(path));
        
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
        maybe.write(isNeedSemicolon(path), ';');
        
        let wasNewline = false;
        
        if (isParentSwitchCase(path)) {
            write.newline();
            
            if (!isFirstInSwitch(path))
                wasNewline = true;
        }
        
        if (isNeedNewline(path)) {
            write.newline();
            wasNewline = true;
        }
        
        store(wasNewline);
    }),
    afterSatisfy: () => [
        isNextIf,
        isNextFn,
        noNextParentBlock,
        notLastCoupleLines,
        isNextAssign,
        isNextCoupleLines,
        notLastPrevVarNotNextVar,
        isNewlineBetweenSiblings,
        isInsideExport,
        isParentTSModuleBlock,
    ],
    after(path, {maybe, store, print}) {
        const wasNewline = store();
        
        if (skipAfter(path))
            return;
        
        maybe.indent(wasNewline);
        print.newline();
        maybe.markAfter(wasNewline, path);
    },
};

const skipAfter = createTypeChecker([
    ['-: parentPath -> !', isLast],
    ['+: -> !', isInsideBlock],
]);

const noNextParentBlock = createTypeChecker([
    ['-', isNext],
    ['+', isInsideBlock],
]);

const notLastCoupleLines = createTypeChecker([
    ['-', isLast],
    ['+', isCoupleLines],
]);

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

const isNextFn = (path) => {
    const nextPath = path.getNextSibling();
    return nextPath.isFunctionDeclaration();
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
