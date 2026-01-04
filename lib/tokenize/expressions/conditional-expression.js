import {maybeParens} from '../maybe/maybe-parens.js';

export const ConditionalExpression = maybeParens((path, {print}) => {
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
