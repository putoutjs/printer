'use strict';

const {maybeParens} = require('../../maybe/maybe-parens');
const insideTypeDeclaration = ({parentPath}) => parentPath.isTSTypeAliasDeclaration();

module.exports.TSUnionType = maybeParens({
    condition: (path) => {
        return path.parentPath.isTSArrayType();
    },
    print: (path, printer, {maxTypesInOneLine}) => {
        const types = path.get('types');
        const {length} = types;
        
        if (!insideTypeDeclaration(path) || length <= maxTypesInOneLine)
            printInOneLine(types, printer);
        else
            printInCoupleLines(types, printer);
    },
});

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
