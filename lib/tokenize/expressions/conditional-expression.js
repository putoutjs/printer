'use strict';

module.exports.ConditionalExpression = (path, {print}) => {
    print('__test');
    print.space();
    print('?');
    print.space();
    print('__consequent');
    print.space();
    print(':');
    print.space();
    print('__alternate');
};
