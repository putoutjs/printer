'use strict';

const {isObjectProperty} = require('@babel/types');
const {entries} = Object;
const isForOf = ({parentPath}) => parentPath.isForOfStatement();

module.exports.ArrayExpression = (path, {write, indent, maybe, traverse}) => {
    write('[');
    
    const elements = path.get('elements');
    
    indent.inc();
    
    const isNewLine = !isNumbers(elements) && !isForOf(path) && isLastArg(path) && !isParentProperty(path);
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

function isLastArg(path) {
    const {parentPath} = path;
    
    if (!parentPath.isCallExpression())
        return true;
    
    const args = parentPath.get('arguments');
    const n = args.length - 1;
    
    return path === args[n];
}

function isParentProperty(path) {
    return path.find(isObjectProperty);
}
