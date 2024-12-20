'use strict';

const {types} = require('@putout/babel');
const {maybeParens} = require('../../maybe/maybe-parens');

const {
    isVariableDeclarator,
    isObjectExpression,
} = types;

module.exports.TSAsExpression = maybeParens((path, {print, maybe}) => {
    const is = isParens(path);
    
    maybe.print(is, '(');
    print('__expression');
    maybe.print(is, ')');
    
    print(' as ');
    print('__typeAnnotation');
});

function isParens(path) {
    const {expression} = path.node;
    
    if (isVariableDeclarator(path.parentPath))
        return false;
    
    return isObjectExpression(expression);
}
