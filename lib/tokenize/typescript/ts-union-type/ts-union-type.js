'use strict';

const {
    maybeParenOpen,
    maybeParenClose,
} = require('../../expressions/unary-expression/parens');

module.exports.TSUnionType = (path, printer, semantics) => {
    const types = path.get('types');
    
    maybeParenOpen(path, printer);
    
    if (types.length <= semantics.maxTypesInOneLine)
        printInOneLine(types, printer);
    else
        printInCoupleLines(types, printer);
    
    maybeParenClose(path, printer);
};

function printInOneLine(types, {traverse, write}) {
    const n = types.length - 1;
    
    for (const [i, type] of types.entries()) {
        traverse(type);
        
        if (i < n) {
            write.space();
            write('|');
            write.space();
        }
    }
}

function printInCoupleLines(types, {traverse, write, indent}) {
    indent.inc();
    
    for (const type of types) {
        write.breakline();
        write('|');
        write.space();
        traverse(type);
    }
    
    indent.dec();
}
