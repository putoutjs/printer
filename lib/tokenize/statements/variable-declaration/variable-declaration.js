import {createTypeChecker} from '#type-checker';
import {isConcatenation} from '#is-concatenation';
import {maybeDeclare} from '#maybe-declare';
import {parseLeadingComments} from '#comments';
import {markAfter} from '#mark';
import {
    exists,
    isInsideIf,
    isInsideBlock,
    isInsideTSModuleBlock,
    isInsideProgram,
    isInsideSwitchCase,
    isInsideBody,
} from '#is';
import {
    afterIf,
    isIndentAfterNewline,
} from './after-if.js';
import {maybeSpaceAfterKeyword} from './maybe-space-after-keyword.js';
import {beforeIf} from './before-if.js';
import {
    isInsideParentLike,
    isNeedNewline,
} from './is.js';

const isParentTSModuleBlock = (path) => path.parentPath.isTSModuleBlock();

const isInsideBlockLike = createTypeChecker([
    isInsideProgram,
    isInsideBlock,
    isInsideTSModuleBlock,
    isInsideSwitchCase,
    isInsideBody,
]);

const isNeedSemicolon = createTypeChecker([
    ['+', isInsideParentLike],
    ['+: parentPath -> SwitchCase'],
    ['+', isParentTSModuleBlock],
    ['+', isInsideIf],
    ['+', isInsideBody],
]);

export const VariableDeclaration = {
    beforeIf,
    before(path, {print}) {
        print.breakline();
    },
    print: maybeDeclare((path, {maybe, write, traverse, print, indent}, semantics) => {
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
        
        if (isNeedNewline(path))
            write.newline();
        
        if (isIndentAfterNewline(path)) {
            indent();
            markAfter(path);
        }
    }),
    afterIf,
    after(path, {print}) {
        print.newline();
    },
};

