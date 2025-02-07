'use strict';

const {types} = require('@putout/babel');
const {isMemberExpression} = types;

module.exports.Decorator = (path, {print, maybe}) => {
    const {expression} = path.node;
    const isMember = isMemberExpression(expression);
    
    print('@');
    
    maybe.print(isMember, '(');
    print('__expression');
    maybe.print(isMember, ')');
};
