'use strict';

const {maybeParens} = require('../maybe/maybe-parens');

module.exports.ConditionalExpression = maybeParens((path, {print}) => {
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
