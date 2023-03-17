'use strict';

const {isCoupleLines} = require('../is');
const isBodyOfArrow = (path) => path.parentPath.node.body === path.node;
const isForOf = (path) => {
    if (path.parentPath.isForOfStatement())
        return true;
    
    return path.parentPath?.parentPath?.isForOfStatement();
};

module.exports.ObjectExpression = (path, {traverse, write, maybe, indent}) => {
    indent.inc();
    
    const properties = path.get('properties');
    const {length} = properties;
    const parens = isBodyOfArrow(path);
    const manyLines = !isOneLine(path);
    
    maybe.write(parens, '(');
    write('{');
    
    maybe.write(manyLines, '\n');
    
    for (const property of properties) {
        if (property.isSpreadElement()) {
            maybe.indent(length > 1);
            traverse(property);
            
            if (length > 1) {
                write(',');
                write.newline();
            }
            
            continue;
        }
        
        const {shorthand, computed} = property.node;
        
        maybe.indent(manyLines);
        
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
        
        maybe.write(manyLines, ',\n');
    }
    
    indent.dec();
    maybe.indent(manyLines);
    write('}');
    maybe.write(parens, ')');
};
function isOneLine(path) {
    const isCall = path.parentPath.isCallExpression();
    const {length} = path.get('properties');
    
    if (isCoupleLines(path))
        return false;
    
    if (!length)
        return true;
    
    if (isCall && length < 2)
        return true;
    
    return isForOf(path);
}
