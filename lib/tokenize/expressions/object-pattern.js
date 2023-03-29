'use strict';

const isForOf = (path) => path.parentPath?.parentPath?.parentPath?.isForOfStatement();

module.exports.ObjectPattern = (path, {indent, print, maybe}) => {
    indent.inc();
    print('{');
    
    const properties = path.get('properties');
    const n = properties.length - 1;
    
    const is = !isForOf(path) && !path.parentPath.isFunction() && n && checkLength(properties);
    maybe.print(is, '\n');
    
    for (const [i, property] of properties.entries()) {
        if (property.isRestElement()) {
            print(property);
            continue;
        }
        
        const valuePath = property.get('value');
        const keyPath = property.get('key');
        const {shorthand} = property.node;
        
        maybe.indent(is);
        print(keyPath);
        
        if (!shorthand) {
            print(': ');
            print(valuePath);
        }
        
        if (valuePath.isAssignmentPattern())
            print(valuePath);
        
        if (is) {
            print(',');
            print.newline();
            continue;
        }
        
        maybe.print(i < n, ', ');
    }
    
    indent.dec();
    maybe.indent(is);
    print('}');
};

function checkLength(properties) {
    for (const prop of properties) {
        if (prop.node.value.name.length > 4)
            return true;
    }
    
    return false;
}

