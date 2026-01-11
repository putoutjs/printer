import {
    hasTrailingComment,
    isNext,
} from '#is';
import {maybePrintTypeAnnotation} from '../../maybe/maybe-type-annotation.js';
import {printKey} from '../../expressions/object-expression/print-key.js';
import {
    printLeadingCommentLine,
    printLeadingCommentBlock,
    printTrailingCommentBlock,
} from './comments.js';

export const TSPropertySignature = (path, printer) => {
    const {maybe, write} = printer;
    const {optional, readonly} = path.node;
    
    maybe.print(readonly, 'readonly ');
    printKey(path, printer);
    maybe.print(optional, '?');
    
    maybePrintTypeAnnotation(path, printer);
    
    if (!isTSTypeLiteralWithOneMember(path)) {
        write(';');
        write.newline();
    }
    
    if (isNext(path) && hasTrailingComment(path))
        write.newline();
};
TSPropertySignature.printLeadingCommentLine = printLeadingCommentLine;
TSPropertySignature.printLeadingCommentBlock = printLeadingCommentBlock;
TSPropertySignature.printTrailingCommentBlock = printTrailingCommentBlock;

function isTSTypeLiteralWithOneMember({parentPath}) {
    if (!parentPath.parentPath.isTSTypeParameterInstantiation())
        return false;
    
    return parentPath.node.members.length === 1;
}
