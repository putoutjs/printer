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
    hasLeadingComment,
} from '#is';
import {
    afterIf,
    isIndentAfterNewline,
} from './after-if.js';
import {maybeSpaceAfterKeyword} from './maybe-space-after-keyword.js';
import {beforeIf} from './before-if.js';
import {
    isInsideParentLike,
    isNeedBreaklineAfterComma,
    isNeedSpaceAfterComma,
    isNewlineAfterSemicolon,
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
    print: maybeDeclare((path, printer, semantics) => {
        const {kind} = path.node;
        const {
            maybe,
            write,
            traverse,
            indent,
        } = printer;
        
        const {maxVariablesInOneLine} = semantics;
        
        if (isInsideBlockLike(path))
            indent();
        
        write(kind);
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
            
            if (isLast)
                continue;
            
            const next = declarations[index + 1];
            
            write(',');
            
            if (hasLeadingComment(next)) {
                parseLeadingComments(next, printer, semantics);
                continue;
            }
            
            if (isNeedBreaklineAfterComma(path, {maxVariablesInOneLine})) {
                write.breakline();
                continue;
            }
            
            if (isNeedSpaceAfterComma(path, {maxVariablesInOneLine}))
                write.space();
        }
        
        maybe.indent.dec(n);
        
        if (isNeedSemicolon(path))
            write(';');
        
        if (isNewlineAfterSemicolon(path))
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
