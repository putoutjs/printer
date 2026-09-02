import {createTypeChecker} from '#type-checker';
import {isCoupleLines} from '#is';

export const isConditionalExpressionMultiline = createTypeChecker([
    ['-: node.alternate -> ObjectExpression'],
    ['-: node.consequent -> ObjectExpression'],
    ['-: parentPath -> CallExpression'],
    ['+', isCoupleLines],
]);

export const printConditionalExpressionMultiline = (path, {print, indent}) => {
    print('__test');
    print.space();
    print('?');
    indent.inc();
    print.breakline();
    print('__consequent');
    print.space();
    print(':');
    print.breakline();
    indent.dec();
    print('__alternate');
};

