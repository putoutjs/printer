'use strict';

const {isParens} = require('./unary-expression/parens');

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
