'use strict';

module.exports.ArrayPattern = (path, {write, traverse}) => {
    write('[');
    
    for (const element of path.get('elements')) {
        traverse(element);
    }
    
    write(']');
};

module.exports.ArrayExpression = (path, {write, indent, incIndent, decIndent, traverse}) => {
    write('[');
    incIndent();
    
    const elements = path.get('elements');
    
    for (const element of elements) {
        write('\n');
        indent();
        traverse(element);
        write(',\n');
    }
    
    decIndent();
    
    if (elements.length)
        indent();
    
    write(']');
};

