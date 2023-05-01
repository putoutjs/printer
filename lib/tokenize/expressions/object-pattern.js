'use strict';

const {isIdentifier} = require('@babel/types');
const {
    isForOf,
    isCoupleLines,
} = require('../is');

module.exports.ObjectPattern = (path, {indent, print, maybe}) => {
    indent.inc();
    print('{');
    
    const properties = path.get('properties');
    const n = properties.length - 1;
    const is = shouldAddNewline(path);
    
    maybe.print(is, '\n');
    
    for (const [i, property] of properties.entries()) {
        if (property.isRestElement()) {
            print(property);
            continue;
        }
        
        const valuePath = property.get('value');
        const keyPath = property.get('key');
        const isAssign = valuePath.isAssignmentPattern();
        const {shorthand} = property.node;
        
        maybe.indent(is);
        maybe.print(!isAssign || !shorthand, keyPath);
        
        if (!shorthand) {
            print(': ');
            print(valuePath);
        } else if (isAssign) {
            const couple = isCoupleLines(valuePath);
            maybe.print.breakline(couple);
            print(valuePath);
            
            maybe.print(couple, ',');
            maybe.print.newline(couple);
        }
        
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
        const {value} = prop.node;
        
        if (!isIdentifier(value))
            continue;
        
        if (value.name.length > 4)
            return true;
    }
    
    return false;
}

function shouldAddNewline(path) {
    const properties = path.get('properties');
    const n = properties.length - 1;
    
    if (!isForOf(path) && !path.parentPath.isFunction() && n && checkLength(properties))
        return true;
    
    if (path.parentPath.isObjectProperty())
        return true;
    
    return false;
}
