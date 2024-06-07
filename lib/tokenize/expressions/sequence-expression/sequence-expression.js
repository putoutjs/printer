'use strict';

module.exports.SequenceExpression = (path, {maybe, write, traverse}) => {
    const expressions = path.get('expressions');
    const n = expressions.length - 1;
    
    write('(');
    
    for (const [index, expression] of expressions.entries()) {
        traverse(expression);
        maybe.write(index < n, ',');
        maybe.write.space(index < n);
    }
    
    write(')');
};
