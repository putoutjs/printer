import {types} from '@putout/babel';
import {hasPrevNewline} from '#mark';
import {createTypeChecker} from '#type-checker';
import {isConcatenation} from '#is-concatenation';
import {maybeDeclare} from '#maybe-declare';
import {parseLeadingComments} from '#comments';
import {
    isNext,
    isCoupleLines,
    isNewlineBetweenSiblings,
    exists,
    noTrailingComment,
    isInsideIf,
    isInsideBlock,
    isInsideTSModuleBlock,
    isInsideProgram,
    isInsideSwitchCase,
    isInsideBody,
    callWithParent,
} from '#is';
import {afterIf} from './after-if.js';
import {maybeSpaceAfterKeyword} from './maybe-space-after-keyword.js';

const {isExportDeclaration} = types;

const isLast = (path) => path.parentPath?.isProgram() && !isNext(path);

const isParentTSModuleBlock = (path) => path.parentPath.isTSModuleBlock();

const isInsideBlockLike = createTypeChecker([
    isInsideProgram,
    isInsideBlock,
    isInsideTSModuleBlock,
    isInsideSwitchCase,
    isInsideBody,
]);

const isParentSwitchCase = (path) => path.parentPath.isSwitchCase();

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
    ['+', isParentSwitchCase],
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
        
        if (isNeedNewline(path)) {
            write.newline();
            wasNewline = true;
        }
        
        store(wasNewline);
    }),
    afterIf,
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
