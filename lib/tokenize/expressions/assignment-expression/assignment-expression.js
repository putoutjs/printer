import {maybeParens} from '#maybe-parens';
import {condition} from './maybe-parens-condition.js';
import {printSeparator} from './print-separator.js';
import {
    printLeadingCommentLine,
    maybeInsideReturnWithCommentEnd,
    maybeInsideReturnWithCommentStart,
    printLeadingCommentBlock,
} from './assignment-expression-comments.js';

const isInsideBlock = ({parentPath}) => /BlockStatement|Program/.test(parentPath.type);

export const AssignmentExpression = maybeParens({
    checkParens: false,
    condition,
    print(path, printer) {
        const {print} = printer;
        const {operator} = path.node;
        
        maybeInsideReturnWithCommentStart(path, printer);
        
        print('__left');
        print.space();
        print(operator);
        printSeparator(path, printer);
        print('__right');
        
        if (isInsideBlock(path)) {
            print(';');
            print.breakline();
        }
        
        maybeInsideReturnWithCommentEnd(path, printer);
    },
});

AssignmentExpression.printLeadingCommentLine = printLeadingCommentLine;
AssignmentExpression.printLeadingCommentBlock = printLeadingCommentBlock;
