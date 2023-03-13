'use strict';

module.exports.ObjectExpression = (path, {traverse, indent, write, maybeWrite, incIndent, decIndent}) => {
    incIndent();
    
    const parens = path.parentPath.node.body === path.node;
    
    maybeWrite(parens, '(');
    write('{\n');
    
    for (const property of path.get('properties')) {
        indent();
        traverse(property.get('key'));
        write(': ');
        traverse(property.get('value'));
        write(',\n');
    }
    
    write('}');
    maybeWrite(parens, ')');
    
    decIndent();
};

