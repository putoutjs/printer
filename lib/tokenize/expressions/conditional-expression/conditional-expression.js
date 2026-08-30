import {types} from '@putout/babel';
import {maybeParens} from '#maybe-parens';
import {isCoupleLines} from '#is';
import {ConditionalExpressionMultiline} from './conditional-expression-multiline.js';

const {isObjectExpression} = types;

export const ConditionalExpression = maybeParens((path, printer) => {
    const {print} = printer;
    const {alternate} = path.node;
    
    if (isCoupleLines(path) && !isObjectExpression(alternate)) {
        ConditionalExpressionMultiline(path, printer);
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

