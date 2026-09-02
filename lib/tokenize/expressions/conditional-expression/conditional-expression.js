import {maybeParens} from '#maybe-parens';
import {
    isConditionalExpressionMultiline,
    printConditionalExpressionMultiline,
} from './conditional-expression-multiline.js';

export const ConditionalExpression = maybeParens((path, printer) => {
    const {print} = printer;
    
    if (isConditionalExpressionMultiline(path)) {
        printConditionalExpressionMultiline(path, printer);
        return;
    }
    
    print('__test');
    print.space();
    print('?');
    print.space();
    print('__consequent');
    print.space();
    print(':');
    print.space();
    print('__alternate');
});
