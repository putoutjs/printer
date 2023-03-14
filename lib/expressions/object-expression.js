'use strict';

const isBodyOfArrow = (path) => path.parentPath.node.body === path.node;

module.exports.ObjectExpression = (path, {traverse, indent, write, maybeWrite, incIndent, decIndent}) => {
    incIndent();
    
    const parens = isBodyOfArrow(path);
    
    maybeWrite(parens, '(');
    write('{\n');
    
    for (const property of path.get('properties')) {
        const {shorthand, computed} = property.node;
        
        indent();
        
        if (property.isObjectMethod()) {
            traverse(property);
            continue;
        }
        
        maybeWrite(computed, '[');
        traverse(property.get('key'));
        maybeWrite(computed, ']');
        
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

