'use strict';

const {maybePrintTypeAnnotation} = require('../../maybe/maybe-type-annotation');

const {
    hasTrailingComment,
    isNext,
} = require('../../is');

const {printKey} = require('../../expressions/object-expression/print-key');

const {
    printLeadingCommentLine,
    printLeadingCommentBlock,
    printTrailingCommentBlock,
} = require('./comments');

module.exports.TSPropertySignature = (path, printer) => {
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
module.exports.TSPropertySignature.printLeadingCommentLine = printLeadingCommentLine;
module.exports.TSPropertySignature.printLeadingCommentBlock = printLeadingCommentBlock;
module.exports.TSPropertySignature.printTrailingCommentBlock = printTrailingCommentBlock;

function isTSTypeLiteralWithOneMember({parentPath}) {
    if (!parentPath.parentPath.isTSTypeParameterInstantiation())
        return false;
    
    return parentPath.node.members.length === 1;
}
