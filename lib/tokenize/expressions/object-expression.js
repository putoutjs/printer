'use strict';

const isBodyOfArrow = (path) => path.parentPath.node.body === path.node;
const isForOf = (path) => path.parentPath?.parentPath?.isForOfStatement();

module.exports.ObjectExpression = (path, {traverse, write, maybeWrite, maybeIndent, incIndent, decIndent}) => {
    incIndent();
    
    const properties = path.get('properties');
    const parens = isBodyOfArrow(path);
    const isCall = path.parentPath.isCallExpression();
    const isOneLine = isCall && properties.length < 2 || isForOf(path);
    
    maybeWrite(parens, '(');
    write('{');
    
    maybeWrite(!isOneLine, '\n');
    
    for (const property of properties) {
        const {shorthand, computed} = property.node;
        
        maybeIndent(!isOneLine);
        
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
        
        maybeWrite(!isOneLine, ',\n');
    }
    
    decIndent();
    maybeIndent(!isOneLine);
    write('}');
    maybeWrite(parens, ')');
};
