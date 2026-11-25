import {createTypeChecker} from '#type-checker';
import {isCoupleLines} from '#is';
import {
    printGapSameLine,
    printGapOwnLine,
} from '../../comments/comments-printer/operand-comments.js';
import {hasTernaryComments} from './comments.js';

export const isConditionalExpressionMultiline = createTypeChecker([
    ['+', hasTernaryComments],
    ['-: node.alternate -> ObjectExpression'],
    ['-: node.consequent -> ObjectExpression'],
    ['-: parentPath -> CallExpression'],
    ['+', isCoupleLines],
]);

export const printConditionalExpressionMultiline = (path, printer) => {
    const {
        print,
        indent,
        maybe,
    } = printer;
    
    const hasComments = hasTernaryComments(path);
    const consequent = path.get('consequent');
    const alternate = path.get('alternate');
    
    print('__test');
    print.space();
    print('?');
    printGapSameLine(consequent, printer);
    indent.inc();
    print.breakline();
    printGapOwnLine(consequent, printer);
    print('__consequent');
    print.space();
    print(':');
    printGapSameLine(alternate, printer);
    print.breakline();
    printGapOwnLine(alternate, printer);
    maybe.indent.dec(!hasComments);
    print('__alternate');
    maybe.indent.dec(hasComments);
};
