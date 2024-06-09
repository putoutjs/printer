'use strict';

const {
    maybeWriteLeftBrace,
    maybeWriteRightBrace,
} = require('./maybe-write-brace');

module.exports.SequenceExpression = (path, printer, semantics) => {
    const {maybe, traverse} = printer;
    
    const expressions = path.get('expressions');
    const n = expressions.length - 1;
    
    maybeWriteLeftBrace(path, printer, semantics);
    
    for (const [index, expression] of expressions.entries()) {
        traverse(expression);
        maybe.write(index < n, ',');
        maybe.write.space(index < n);
    }
    
    maybeWriteRightBrace(path, printer, semantics);
};
