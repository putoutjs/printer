'use strict';

module.exports.TSTupleType = (path, {write, traverse, indent, maybe}) => {
    const elementTypes = path.get('elementTypes');
    
    write('[');
    indent.inc();
    maybe.write.newline(elementTypes.length);
    
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

