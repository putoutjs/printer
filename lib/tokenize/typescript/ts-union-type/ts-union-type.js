'use strict';

const {
    maybeParenOpen,
    maybeParenClose,
} = require('../../expressions/unary-expression/parens');

module.exports.TSUnionType = (path, printer) => {
    const {traverse, write} = printer;
    
    const types = path.get('types');
    const n = types.length - 1;
    
    maybeParenOpen(path, printer);
    
    for (const [i, type] of types.entries()) {
        traverse(type);
        
        if (i < n) {
            write.space();
            write('|');
            write.space();
        }
    }
    
    maybeParenClose(path, printer);
};
