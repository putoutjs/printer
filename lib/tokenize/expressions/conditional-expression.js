'use strict';

const isParens = (path) => path.node.extra?.parenthesized;

module.exports.ConditionalExpression = {
    condition: isParens,
    before(path, {print}) {
        print('(');
    },
    print(path, {print}) {
        print('__test');
        print.space();
        print('?');
        print.space();
        print('__consequent');
        print.space();
        print(':');
        print.space();
        print('__alternate');
    },
    after(path, {print}) {
        print(')');
    },
};
