'use strict';

const {entries} = Object;
const isForOf = (path) => path.parentPath?.parentPath?.parentPath?.isForOfStatement();
const isAssign = (path) => path.isAssignmentPattern();

module.exports.ObjectPattern = (path, {traverse, maybeIndent, write, maybeWrite, incIndent, decIndent}) => {
    incIndent();
    
    write('{');
    
    const properties = path.get('properties');
    const n = properties.length - 1;
    
    const is = !isForOf(path) && !path.parentPath.isFunction() && n && checkLength(properties);
    maybeWrite(is, '\n');
    
    for (const [i, property] of entries(properties)) {
        const valuePath = property.get('value');
        const keyPath = property.get('key');
        const {shorthand} = property.node;
        
        maybeIndent(is);
        traverse(keyPath);
        
        if (!shorthand) {
            write(': ');
            traverse(valuePath);
        }
        
        if (isAssign(valuePath))
            traverse(valuePath);
        
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
