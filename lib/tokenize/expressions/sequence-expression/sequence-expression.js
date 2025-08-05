'use strict';

const {hasLeadingComment} = require('#is');
const {maybeParens} = require('../../maybe/maybe-parens');
const {condition} = require('./maybe-write-brace');

const {
    maybePrintComments,
    printLeadingCommentLine,
    printLeadingCommentBlock,
} = require('./sequence-expression-comments');

module.exports.SequenceExpression = maybeParens({
    checkParens: false,
    condition,
    print(path, printer) {
        const {
            write,
            traverse,
            indent,
            maybe,
        } = printer;
        
        const expressions = path.get('expressions');
        const n = expressions.length - 1;
        
        const withComment = hasLeadingComment(path);
        
        if (withComment) {
            indent.inc();
            write.breakline();
            maybePrintComments(path, printer);
        }
        
        for (const [index, expression] of expressions.entries()) {
            traverse(expression);
            
            if (index < n) {
                write(',');
                maybe.write.space(!withComment);
                maybe.print.breakline(withComment);
            }
        }
        
        if (withComment) {
            indent.dec();
            write.breakline();
        }
    },
});

module.exports.SequenceExpression.printLeadingCommentLine = printLeadingCommentLine;
module.exports.SequenceExpression.printLeadingCommentBlock = printLeadingCommentBlock;
