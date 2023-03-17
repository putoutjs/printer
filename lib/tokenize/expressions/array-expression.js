'use strict';

const {isObjectProperty} = require('@babel/types');
const {entries} = Object;
const isForOf = ({parentPath}) => parentPath.isForOfStatement();

module.exports.ArrayExpression = (path, {write, maybe, traverse}) => {
    const elements = path.get('elements');
    const elementIsObject = isElementObject(path);
    
    write('[');
    maybe.indent.inc(!elementIsObject);
    
    const isNewLine = !isNumbers(elements) && !isForOf(path) && isLastArg(path) && !isParentProperty(path);
    const n = elements.length - 1;
    
    maybe.write(isNewLine && elements.length, '\n');
    
    for (const [index, element] of entries(elements)) {
        maybe.indent(isNewLine);
        
        traverse(element);
        
        maybe.write(isNewLine, ',\n');
        maybe.write(!isNewLine && index < n, ', ');
    }
    
    maybe.indent.dec(!elementIsObject);
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

function isElementObject(path) {
    const elements = path.get('elements');
    
    if (!elements.length)
        return false;
    
    return elements[0].isObjectExpression();
}
