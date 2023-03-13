'use strict';

const isBodyOfArrow = (path) => path.parentPath.node.body === path.node;

module.exports.ObjectExpression = (path, {traverse, indent, write, maybeWrite, incIndent, decIndent}) => {
    incIndent();
    
    const parens = isBodyOfArrow(path);
    
    maybeWrite(parens, '(');
    write('{\n');
    
    for (const property of path.get('properties')) {
        const {shorthand} = property.node;
        
        indent();
        
        if (property.isObjectMethod()) {
            traverse(property);
            continue;
        }
        
        traverse(property.get('key'));
        
        if (!shorthand) {
            write(': ');
            traverse(property.get('value'));
        }
        
        write(',\n');
    }
    
    decIndent();
    indent();
    write('}');
    maybeWrite(parens, ')');
};

