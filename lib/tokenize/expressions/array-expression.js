'use strict';

const {round} = Math;

const {
    isObjectProperty,
    isStringLiteral,
    isArrayExpression,
    isIdentifier,
    isCallExpression,
} = require('@babel/types');

const {isSimple} = require('@putout/operate');

const {
    isCoupleLines,
    isStringAndIdentifier,
} = require('../is');

const isForOf = ({parentPath}) => parentPath.isForOfStatement();
const SECOND = 1;
const isStringAndArray = ([a, b]) => isStringLiteral(a) && isArrayExpression(b);
const isStringAndString = ([a, b]) => isStringLiteral(a) && isStringLiteral(b);
const isIdentifierAndIdentifier = ([a, b]) => isIdentifier(a) && isIdentifier(b);
const isInsideArray = (path) => path.parentPath.isArrayExpression();
const isSimpleAndCall = ([a, b]) => isSimple(a) && isCallExpression(b);

const isTwoLongStrings = ([a, b]) => {
    const LONG_STRING = 20;
    
    if (!a?.isStringLiteral() || !b?.isStringLiteral())
        return false;
    
    if (a.node.value.length > LONG_STRING)
        return true;
    
    return false;
};

module.exports.ArrayExpression = {
    beforeIf(path) {
        const {parentPath} = path;
        const {elements} = path.node;
        
        if (!parentPath.isArrayExpression())
            return false;
        
        if (isCoupleLines(parentPath))
            return false;
        
        if (isStringAndIdentifier(elements))
            return true;
        
        return isIdentifierAndIdentifier(elements);
    },
    before(path, {print}) {
        print.breakline();
    },
    print(path, {print, maybe, indent}) {
        const elements = path.get('elements');
        const shouldIncreaseIndent = isIncreaseIndent(path);
        
        print('[');
        
        if (!isTwoLongStrings(elements))
            maybe.indent.inc(!shouldIncreaseIndent);
        
        const isNewLine = isNewlineBetweenElements(path, {
            elements,
        });
        
        const n = elements.length - 1;
        
        maybe.print.newline(isNewLine && elements.length);
        
        for (const [index, element] of elements.entries()) {
            maybe.indent(isNewLine);
            print(element);
            maybe.print(isNewLine, ',');
            maybe.print.newline(isNewLine);
            maybe.print(!isNewLine && index < n, ', ');
        }
        
        if (!isTwoLongStrings(elements))
            maybe.indent.dec(!shouldIncreaseIndent);
        
        const parentElements = path.parentPath.get('elements');
        
        if (isInsideArray(path) && isStringAndArray(parentElements)) {
            indent.dec();
            maybe.indent(elements.length && isNewLine);
            indent.inc();
        } else {
            maybe.indent(elements.length && isNewLine);
        }
        
        print(']');
    },
    afterIf(path) {
        const {parentPath} = path;
        const {elements} = path.node;
        
        if (!parentPath.isArrayExpression())
            return false;
        
        if (isCoupleLines(parentPath))
            return false;
        
        if (isStringAndIdentifier(elements))
            return true;
        
        return isIdentifierAndIdentifier(elements);
    },
    after(path, {print, indent}) {
        indent.dec();
        print.breakline();
        indent.inc();
    },
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

function isIncreaseIndent(path) {
    const elements = path.get('elements');
    
    if (!elements.length)
        return false;
    
    if (isInsideCallLoop(path))
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

function isCallInsideArrow(path) {
    const {parentPath} = path;
    
    if (!parentPath.isCallExpression())
        return false;
    
    if (!parentPath.parentPath.isFunction())
        return false;
    
    return path.node.elements.length < 4;
}

function isOneSimple(path) {
    const elements = path.get('elements');
    
    if (elements.length !== 1)
        return false;
    
    const [first] = elements;
    
    if (first.isIdentifier() && first.node.name.length < 5)
        return true;
    
    if (first.isCallExpression())
        return false;
    
    return first.isMemberExpression();
}

function isNewlineBetweenElements(path, {elements}) {
    if (isOneSimple(path))
        return false;
    
    if (elements.length === 2 && isIdentifierAndIdentifier(elements))
        return false;
    
    if (isCallInsideArrow(path))
        return false;
    
    if (isOneElementCall(path, {elements}))
        return false;
    
    if (isIncreaseIndent(path))
        return false;
    
    if (isInsideLoop(path))
        return false;
    
    if (isSimpleAndCall(elements))
        return false;
    
    if (isTwoStringsDifferentLength(elements))
        return false;
    
    if (isStringAndArray(elements))
        return false;
    
    if (isStringAndIdentifier(elements))
        return false;
    
    if (isStringAndString(elements) && path.parentPath.isArrayExpression() && isArrayExpression(path.parentPath.node.elements[0]))
        return false;
    
    if (tooLong(path) || isCoupleLines(path) || !isNumbers(elements) && !isForOf(path) && isLastArg(path) && !isParentProperty(path))
        return true;
    
    return false;
}

function isTwoStringsDifferentLength(strings) {
    const [a, b] = strings;
    
    if (strings.length > 2)
        return false;
    
    if (!a?.isStringLiteral() || !b?.isStringLiteral())
        return false;
    
    const aLength = a.node.value.length;
    const bLength = b.node.value.length;
    
    return round(bLength / aLength) > 2;
}

function isInsideCallLoop(path) {
    if (!path.parentPath.isCallExpression())
        return false;
    
    if (!path.parentPath.parentPath.isForOfStatement())
        return false;
    
    return true;
}

function isInsideLoop(path) {
    if (!path.parentPath.isForOfStatement())
        return false;
    
    return true;
}

const isOneElementCall = (path, {elements}) => {
    if (!path.parentPath.isCallExpression())
        return false;
    
    if (elements.length !== 1)
        return false;
    
    return !isCallExpression(elements[0]);
};
