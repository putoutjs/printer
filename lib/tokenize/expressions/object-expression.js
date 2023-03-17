'use strict';

const isBodyOfArrow = (path) => path.parentPath.node.body === path.node;
const isForOf = (path) => {
    if (path.parentPath.isForOfStatement())
        return true;
    
    if (path.parentPath?.parentPath?.isForOfStatement())
        return true;
    
    return false;
};

const isFirstMethod = (path) => path.get('properties.0').isObjectMethod();

module.exports.ObjectExpression = (path, {traverse, write, maybe, indent}) => {
    indent.inc();
    
    const properties = path.get('properties');
    const parens = isBodyOfArrow(path);
    const isCall = path.parentPath.isCallExpression();
    const {length} = properties;
    const isOneLine = !length || isCall && length < 2 && !isFirstMethod(path) || isForOf(path);
    
    maybe.write(parens, '(');
    write('{');
    
    maybe.write(!isOneLine, '\n');
    
    for (const property of properties) {
        if (property.isSpreadElement()) {
            maybe.indent(properties.length > 1);
            traverse(property);
            
            if (properties.length > 1) {
                write(',');
                write.newline();
            }
            
            continue;
        }
        
        const {shorthand, computed} = property.node;
        
        maybe.indent(!isOneLine);
        
        if (property.isObjectMethod()) {
            traverse(property);
            continue;
        }
        
        maybe.write(computed, '[');
        traverse(property.get('key'));
        maybe.write(computed, ']');
        
        if (!shorthand) {
            write(': ');
            traverse(property.get('value'));
        }
        
        maybe.write(!isOneLine, ',\n');
    }
    
    indent.dec();
    maybe.indent(!isOneLine);
    write('}');
    maybe.write(parens, ')');
};
