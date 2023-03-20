'use strict';

const {isCoupleLines} = require('../is');
const isBodyOfArrow = (path) => path.parentPath.node.body === path.node;
const isForOf = (path) => {
    if (path.parentPath.isForOfStatement())
        return true;
    
    return path.parentPath?.parentPath?.isForOfStatement();
};

module.exports.ObjectExpression = (path, {print, maybe, indent}) => {
    indent.inc();
    
    const properties = path.get('properties');
    const {length} = properties;
    const parens = isBodyOfArrow(path);
    const manyLines = !isOneLine(path);
    
    maybe.print(parens, '(');
    print('{');
    
    maybe.print(manyLines, '\n');
    
    for (const property of properties) {
        if (property.isSpreadElement()) {
            maybe.indent(length > 1);
            print(property);
            
            if (length > 1) {
                print(',');
                print.newline();
            }
            
            continue;
        }
        
        const {shorthand, computed} = property.node;
        
        maybe.indent(manyLines);
        
        if (property.isObjectMethod()) {
            print(property);
            continue;
        }
        
        maybe.print(computed, '[');
        print(property.get('key'));
        maybe.print(computed, ']');
        
        if (!shorthand) {
            print(': ');
            print(property.get('value'));
        }
        
        maybe.print(manyLines, ',\n');
    }
    
    indent.dec();
    
    maybe.indent(manyLines);
    print('}');
    maybe.print(parens, ')');
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
