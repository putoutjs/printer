import {hasLeadingComment} from '#is';
import {maybeParens} from '#maybe-parens';
import {condition} from './maybe-write-brace.js';
import {
    maybePrintComments,
    printLeadingCommentLine,
    printLeadingCommentBlock,
} from './sequence-expression-comments.js';

export const SequenceExpression = maybeParens({
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

SequenceExpression.printLeadingCommentLine = printLeadingCommentLine;
SequenceExpression.printLeadingCommentBlock = printLeadingCommentBlock;
