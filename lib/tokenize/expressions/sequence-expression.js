'use strict';

const {entries} = Object;

module.exports.SequenceExpression = (path, {maybe, print}) => {
    const expressions = path.get('expressions');
    const n = expressions.length - 1;
    
    for (const [index, expression] of entries(expressions)) {
        print(expression);
        maybe.print(index < n, ',');
        maybe.print(index < n, ' ');
    }
};

