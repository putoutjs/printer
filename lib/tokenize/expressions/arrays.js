'use strict';

const {entries} = Object;
const isForOf = ({parentPath}) => parentPath.parentPath.parentPath.isForOfStatement();

module.exports.ArrayPattern = (path, {write, indent, maybe, traverse}) => {
    write('[');
    
    const elements = path.get('elements');
    
    indent.inc();
    const isNewLine = !isForOf(path) && elements.length > 2;
    const n = elements.length - 1;
    
    maybe.write(isNewLine && elements.length, '\n');
    
    for (const [index, element] of entries(elements)) {
        maybe.indent(isNewLine);
        
        traverse(element);
        
        maybe.write(isNewLine, ',\n');
        maybe.write(!isNewLine && index < n, ', ');
    }
    
    indent.dec();
    
    maybe.indent(elements.length && isNewLine);
    
    write(']');
};

module.exports.ArrayExpression = (path, {write, indent, maybe, traverse}) => {
    write('[');
    
    const elements = path.get('elements');
    
    indent.inc();
    const isNewLine = !isNumbers(elements);
    const n = elements.length - 1;
    
    maybe.write(isNewLine && elements.length, '\n');
    
    for (const [index, element] of entries(elements)) {
        maybe.indent(isNewLine);
        
        traverse(element);
        
        maybe.write(isNewLine, ',\n');
        maybe.write(!isNewLine && index < n, ', ');
    }
    
    indent.dec();
    
    maybe.indent(elements.length && isNewLine);
    
    write(']');
};

function isNumbers(elements) {
    for (const element of elements) {
        if (element.isNumericLiteral())
            return true;
    }
    
    return false;
}

