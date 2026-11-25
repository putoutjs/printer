import {createTypeChecker} from '#type-checker';
import {isCoupleLines} from '#is';
import {
    hasTernaryComments,
    printSameLineComment,
    printOwnLineComments,
} from './comments.js';

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
    const test = path.get('test');
    const consequent = path.get('consequent');
    
    print('__test');
    print.space();
    print('?');
    printSameLineComment(test, printer);
    indent.inc();
    print.breakline();
    printOwnLineComments(test, printer);
    print('__consequent');
    print.space();
    print(':');
    printSameLineComment(consequent, printer);
    print.breakline();
    printOwnLineComments(consequent, printer);
    maybe.indent.dec(!hasComments);
    print('__alternate');
    maybe.indent.dec(hasComments);
};
