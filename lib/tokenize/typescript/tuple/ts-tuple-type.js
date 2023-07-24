'use strict';

module.exports.TSTupleType = (path, {write, traverse, indent}) => {
    const elementTypes = path.get('elementTypes');
    
    write('[');
    indent.inc();
    write.newline();
    
    for (const elementType of elementTypes) {
        indent();
        traverse(elementType);
        write(',');
        write.newline();
    }
    
    indent.dec();
    indent();
    write(']');
};
