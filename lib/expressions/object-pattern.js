'use strict';

const {entries} = Object;

module.exports.ObjectPattern = (path, {traverse, maybeIndent, write, maybeWrite, incIndent, decIndent}) => {
    incIndent();
    
    write('{');
    
    const properties = path.get('properties');
    const n = properties.length - 1;
    
    const is = !path.parentPath.isFunction() && properties.length > 1 && checkLength(properties);
    maybeWrite(is, '\n');
    
    for (const [i, property] of entries(properties)) {
        const {shorthand} = property.node;
        maybeIndent(is);
        traverse(property.get('key'));
        
        if (!shorthand) {
            write(': ');
            traverse(property.get('value'));
        }
        
        if (is) {
            write(',\n');
            continue;
        }
        
        if (i < n)
            write(', ');
    }
    
    decIndent();
    maybeIndent(is);
    write('}');
};

function checkLength(properties) {
    for (const prop of properties) {
        if (prop.node.value.name.length > 4)
            return true;
    }
    
    return false;
}
