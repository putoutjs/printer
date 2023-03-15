'use strict';

const {entries} = Object;

module.exports.ArrayPattern = (path, {write, traverse}) => {
    write('[');
    
    for (const element of path.get('elements')) {
        traverse(element);
    }
    
    write(']');
};

module.exports.ArrayExpression = (path, {write, maybeWrite, indent, maybeIndent, incIndent, decIndent, traverse}) => {
    write('[');
    
    const elements = path.get('elements');
    
    incIndent();
    const isNewLine = !isNumbers(elements);
    const n = elements.length - 1;
    
    maybeWrite(isNewLine && elements.length, '\n');
    
    for (const [index, element] of entries(elements)) {
        maybeIndent(isNewLine);
        
        traverse(element);
        
        maybeWrite(isNewLine, ',\n');
        maybeWrite(!isNewLine && index < n, ', ');
    }
    
    decIndent();
    
    maybeIndent(elements.length && isNewLine);
    
    write(']');
};

function isNumbers(elements) {
    for (const element of elements) {
        if (element.isNumericLiteral())
            return true;
    }
    
    return false;
}

