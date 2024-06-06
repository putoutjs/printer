'use strict';

const {maybeParens} = require('../../expressions/function/parens');
const {isObjectExpression} = require('@putout/babel').types;

module.exports.TSAsExpression = maybeParens((path, {print, maybe}) => {
    const {expression} = path.node;
    const is = isObjectExpression(expression);
    
    maybe.print(is, '(');
    print('__expression');
    maybe.print(is, ')');
    
    print(' as ');
    print('__typeAnnotation');
});
