'use strict';

const {isObjectProperty} = require('@babel/types');
const {isCoupleLines} = require('../is');
const {entries} = Object;
const isForOf = ({parentPath}) => parentPath.isForOfStatement();
const SECOND = 1;

module.exports.ArrayExpression = (path, {print, maybe}) => {
    const elements = path.get('elements');
    const elementIsObject = isElementObject(path);
    
    print('[');
    maybe.indent.inc(!elementIsObject);
    
    const isNewLine = !elementIsObject && isNewLineBefore(path, {elements});
    const n = elements.length - 1;
    
    maybe.print(isNewLine && elements.length, '\n');
    
    for (const [index, element] of entries(elements)) {
        maybe.indent(isNewLine);
        print(element);
        maybe.print(isNewLine, ',\n');
        maybe.print(!isNewLine && index < n, ', ');
    }
    
    maybe.indent.dec(!elementIsObject);
    maybe.indent(elements.length && isNewLine);
    print(']');
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
    
    if (elements[0].isObjectExpression())
        return true;
    
    if (elements.length > 1 && elements[SECOND].isObjectExpression())
        return true;
    
    return false;
}

function tooLong(path) {
    const elements = path.get('elements');
    
    if (elements.length < 2)
        return false;
    
    for (const el of path.get('elements')) {
        if (el.isStringLiteral() && el.node.value.length > 4)
            return true;
    }
    
    return false;
}

function isNewLineBefore(path, {elements}) {
    if (tooLong(path) || isCoupleLines(path) || !isNumbers(elements) && !isForOf(path) && isLastArg(path) && !isParentProperty(path))
        return true;
    
    return false;
}
