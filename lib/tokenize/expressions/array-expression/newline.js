'use strict';

const {isSimple} = require('@putout/operate');
const {types} = require('@putout/babel');

const {
    isStringAndMember,
    isStringAndIdentifier,
    isIdentifierAndString,
    isCoupleLines,
    isStringAndArray,
    isIdentifierAndIdentifier,
    isSimpleAndNotEmptyObject,
} = require('../../is');

const {
    isObjectExpression,
    isArrayExpression,
    isObjectProperty,
    isCallExpression,
    isAwaitExpression,
    isBooleanLiteral,
    isNullLiteral,
    isStringLiteral,
    isSpreadElement,
} = types;

const {round} = Math;

const isOneSpread = (elements) => {
    if (elements.length > 1)
        return false;
    
    const [first] = elements;
    
    return isSpreadElement(first);
};

const isSimpleAndCall = ([a, b]) => {
    if (!isSimple(a))
        return;
    
    return isCallExpression(b) || isAwaitExpression(b);
};

const isBooleanAndSimple = ([a, b]) => isBooleanLiteral(a) && isSimple(b);
const isBooleanAndObject = ([a, b]) => isBooleanLiteral(a) && isObjectExpression(b);
const isNullAndSimple = ([a, b]) => isNullLiteral(a) && isSimple(b);
const isSimpleAndObject = ([a, b]) => isSimple(a) && isObjectExpression(b);
const ONE_LINE = false;
const MULTI_LINE = true;

const isSiblingIsArray = (path) => {
    if (path.getNextSibling().isArrayExpression())
        return true;
    
    return path
        .getPrevSibling()
        .isArrayExpression();
};

module.exports.isMultiLine = (path, {elements, maxElementsInOneLine}) => {
    if (elements.length > 3 && !isObjectExpression(elements[0]))
        return MULTI_LINE;
    
    if (isSimpleAndNotEmptyObject(elements))
        return MULTI_LINE;
    
    if (isOneSimple(path))
        return ONE_LINE;
    
    if (isOneSpread(elements))
        return ONE_LINE;
    
    if (elements.length === 2 && isIdentifierAndIdentifier(elements))
        return ONE_LINE;
    
    if (isCallInsideArrow(path))
        return ONE_LINE;
    
    if (isIncreaseIndent(path))
        return ONE_LINE;
    
    if (isInsideLoop(path))
        return ONE_LINE;
    
    if (isBooleanAndSimple(elements))
        return ONE_LINE;
    
    if (isNullAndSimple(elements))
        return ONE_LINE;
    
    if (isSimpleAndCall(elements))
        return ONE_LINE;
    
    if (isShortTwoSimplesInsideCall(path, maxElementsInOneLine))
        return ONE_LINE;
    
    if (isTwoStringsDifferentLength(elements))
        return ONE_LINE;
    
    if (isTwoSimplesInsideObjectProperty(path))
        return ONE_LINE;
    
    if (isStringAndArray(elements) && elements.length < 3)
        return ONE_LINE;
    
    if (isStringAndMember(elements))
        return ONE_LINE;
    
    if (isStringAndIdentifier(elements))
        return ONE_LINE;
    
    if (isIdentifierAndString(elements))
        return ONE_LINE;
    
    if (isSimpleAndObject(elements))
        return ONE_LINE;
    
    if (isStringAndString(elements) && path.parentPath.isArrayExpression() && isArrayExpression(path.parentPath.node.elements[0]))
        return ONE_LINE;
    
    if (isSiblingIsArray(path))
        return ONE_LINE;
    
    if (tooLong(path) || isCoupleLines(path) || !isNumbers(elements) && !isForOf(path) && isLastArg(path) && !isParentProperty(path))
        return MULTI_LINE;
    
    return ONE_LINE;
};

const isForOf = ({parentPath}) => parentPath.isForOfStatement();

const isStringAndString = ([a, b]) => isStringLiteral(a) && isStringLiteral(b);

const isShortTwoSimplesInsideCall = (path, short) => {
    const {node, parentPath} = path;
    
    const {elements} = node;
    const {length} = elements;
    const [a, b] = elements;
    
    if (!parentPath.isCallExpression())
        return false;
    
    if (!isStringLiteral(a) || !isStringLiteral(b))
        return false;
    
    return length < short;
};

const isTwoSimplesInsideObjectProperty = (path) => {
    const {node, parentPath} = path;
    
    const {elements} = node;
    const {length} = elements;
    const [a, b] = elements;
    
    if (length > 2)
        return false;
    
    if (!parentPath.isObjectProperty())
        return false;
    
    if (!isStringLiteral(a) || !isStringLiteral(b))
        return false;
    
    return !isCoupleLines(path);
};

function isOneSimple(path) {
    const elements = path.get('elements');
    
    if (elements.length !== 1)
        return false;
    
    const [first] = elements;
    
    if (first.isIdentifier() && first.node.name.length < 15)
        return true;
    
    if (first.isStringLiteral() && first.node.value.length > 10)
        return false;
    
    if (!first.isIdentifier() && isSimple(first))
        return true;
    
    if (first.isCallExpression())
        return false;
    
    return first.isMemberExpression();
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

function isInsideLoop(path) {
    return path.parentPath.isForOfStatement();
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

function isNumbers(elements) {
    for (const element of elements) {
        if (element.isNumericLiteral())
            return true;
    }
    
    return false;
}

const isLastArg = ({parentPath}) => !parentPath.isCallExpression();

const isParentProperty = (path) => path.find(isObjectProperty);

module.exports.isIncreaseIndent = isIncreaseIndent;
function isIncreaseIndent(path) {
    const elements = path.get('elements');
    
    if (!elements.length)
        return false;
    
    if (isBooleanAndObject(elements))
        return true;
    
    if (isInsideCallLoop(path))
        return false;
    
    if (elements[0].isObjectExpression())
        return true;
    
    if (isSpreadElement(elements[1]))
        return false;
    
    return isStringAndObject(elements);
}

function isInsideCallLoop(path) {
    if (!path.parentPath.isCallExpression())
        return false;
    
    return path.parentPath.parentPath.isForOfStatement();
}

const isStringAndObject = (elements) => {
    const first = elements.at(0);
    const last = elements.at(-1);
    
    return isStringLiteral(first) && isObjectExpression(last);
};

module.exports.isCurrentNewLine = (path) => {
    if (path.isSpreadElement())
        return true;
    
    return !path.isObjectExpression();
};
