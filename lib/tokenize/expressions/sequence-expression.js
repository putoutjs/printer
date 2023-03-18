'use strict';

const {entries} = Object;

module.exports.SequenceExpression = (path, {write, maybe, traverse}) => {
    const expressions = path.get('expressions');
    const n = expressions.length - 1;
    
    for (const [index, expression] of entries(expressions)) {
        traverse(expression);
        maybe.write(index < n, ',');
        maybe.write(index < n, ' ');
    }
};

