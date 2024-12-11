'use strict';

const {
    maybeParenOpen,
    maybeParenClose,
} = require('../../expressions/unary-expression/parens');

module.exports.TSUnionType = (path, printer) => {
    const {
        traverse,
        write,
        indent,
    } = printer;
    
    const types = path.get('types');
    const n = types.length - 1;
    
    maybeParenOpen(path, printer);
    
    if (types.length <= 3) {
        for (const [i, type] of types.entries()) {
            traverse(type);
            
            if (i < n) {
                write.space();
                write('|');
                write.space();
            }
        }
    } else {
        indent.inc();
        for (const type of types) {
            write.breakline();
            write('|');
            write.space();
            traverse(type);
        }
        
        indent.dec();
    }
    
    maybeParenClose(path, printer);
};

