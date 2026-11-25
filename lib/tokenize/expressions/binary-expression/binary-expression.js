import {maybeParens} from '#maybe-parens';
import {isConcatenation} from '#is-concatenation';
import {
    hasBinaryComments,
    printBinaryWithComments,
} from './operand-comments.js';
import {concatenate} from './concatenate.js';
import {maybeSpace} from './maybe-space.js';
import {
    printLeadingCommentLine,
    printLeadingCommentBlock,
} from './comments.js';

export const BinaryExpression = maybeParens({
    printLeadingCommentLine,
    printLeadingCommentBlock,
    print(path, printer) {
        const {
            print,
            indent,
            maybe,
        } = printer;
        
        const {operator} = path.node;
        
        if (operator === 'in' || operator === 'instanceof') {
            print('__left');
            print(' ');
            print(operator);
            print(' ');
            print('__right');
            
            return;
        }
        
        if (isConcatenation(path))
            return concatenate(path, {
                print,
                indent,
                maybe,
            });
        
        if (hasBinaryComments(path))
            return printBinaryWithComments(path, printer);
        
        print('__left');
        print.space();
        print(path.node.operator);
        maybeSpace(path, {
            print,
        });
        print('__right');
    },
});
