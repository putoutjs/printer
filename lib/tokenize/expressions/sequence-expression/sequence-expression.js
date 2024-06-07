'use strict';

const {maybeWriteBrace} = require('./maybe-write-brace');

module.exports.SequenceExpression = (path, printer, semantics) => {
    const {maybe, traverse} = printer;
    
    const expressions = path.get('expressions');
    const n = expressions.length - 1;
    
    maybeWriteBrace(path, printer, semantics, {
        brace: '(',
    });
    
    for (const [index, expression] of expressions.entries()) {
        traverse(expression);
        maybe.write(index < n, ',');
        maybe.write.space(index < n);
    }
    
    maybeWriteBrace(path, printer, semantics, {
        brace: ')',
    });
};
