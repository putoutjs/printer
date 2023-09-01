'use strict';

const {maybeParens} = require('../expressions/function/parens');

module.exports.TSAsExpression = maybeParens((path, {print}) => {
    print('__expression');
    print(' as ');
    print('__typeAnnotation');
});
