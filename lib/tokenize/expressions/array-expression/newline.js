import {isSimple} from '@putout/operate';
import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {
    isStringAndMember,
    isStringAndIdentifier,
    isIdentifierAndString,
    isCoupleLines,
    isStringAndArray,
    isIdentifierAndIdentifier,
    isSimpleAndNotEmptyObject,
    isInsideCall,
} from '#is';
import {isInsideArray} from './indent.js';
import {isInsideForOf} from '../object-pattern/is.js';

const isStringAndString = (path) => {
    const {elements} = path.node;
    const [a, b] = elements;
    
    return isStringLiteral(a) && isStringLiteral(b);
};

const isStringsInsideArray = createTypeChecker([
    ['-: -> !', isStringAndString],
    ['-: -> !', isInsideArray],
    '+: parentPath.node.elements.0 -> ArrayExpression',
]);

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

const isShortTwoSimplesInsideCall = (path, {maxElementsInOneLine}) => {
    const {node, parentPath} = path;
    
    const {elements} = node;
    const {length} = elements;
    const [a, b] = elements;
    
    if (!parentPath.isCallExpression())
        return false;
    
    if (!isStringLiteral(a) || !isStringLiteral(b))
        return false;
    
    return length < maxElementsInOneLine;
};

const {
    isObjectExpression,
    isObjectProperty,
    isCallExpression,
    isAwaitExpression,
    isBooleanLiteral,
    isNullLiteral,
    isStringLiteral,
    isSpreadElement,
    isIdentifier,
} = types;

const {round} = Math;

const isOneSpread = (path) => {
    const {elements} = path.node;
    
    if (elements.length > 1)
        return false;
    
    const [first] = elements;
    
    return isSpreadElement(first);
};

const isSimpleAndCall = (path) => {
    const {elements} = path.node;
    const [a, b] = elements;
    
    if (!isSimple(a))
        return;
    
    return isCallExpression(b) || isAwaitExpression(b);
};

const isBooleanAndSimple = (path) => {
    const {elements} = path.node;
    const [a, b] = elements;
    
    return isBooleanLiteral(a) && isSimple(b);
};

const isBooleanAndObject = ([a, b]) => isBooleanLiteral(a) && isObjectExpression(b);

const isNullAndSimple = (path) => {
    const {elements} = path.node;
    const [a, b] = elements;
    
    return isNullLiteral(a) && isSimple(b);
};

const isSimpleAndObject = (path) => {
    const {elements} = path.node;
    const [a, b] = elements;
    
    return isSimple(a) && isObjectExpression(b);
};

const ONE_LINE = false;
const MULTI_LINE = true;

const isSiblingIsArray = (path) => {
    if (path.getNextSibling().isArrayExpression())
        return true;
    
    return path
        .getPrevSibling()
        .isArrayExpression();
};

const isEmptyArray = (path) => !path.node.elements.length;

const isMoreThenMaxLiteralLength = (path, {maxElementLengthInOneLine}) => {
    const [first] = path.node.elements;
    
    if (!first.value)
        return false;
    
    return first.value.length > maxElementLengthInOneLine;
};

const isMoreThenMaxElementLengthInOneLine = createTypeChecker([
    ['-', isEmptyArray],
    ['-: -> !', isInsideCall],
    ['+', isMoreThenMaxLiteralLength],
]);

function isMaxElementLengthInOneLine(path, {maxElementLengthInOneLine}) {
    const elements = path.get('elements');
    
    if (elements.length > 1)
        return false;
    
    const [first] = elements;
    
    if (!isIdentifier(first))
        return false;
    
    return first.node.name.length < maxElementLengthInOneLine;
}

const isElementsMoreThenMax = (path, {maxElementsInOneLine}) => {
    const {elements} = path.node;
    return elements.length > maxElementsInOneLine;
};

const isElementsMoreThenThree = (path) => {
    const {elements} = path.node;
    return elements.length > 3;
};

const isElementsMoreThenThreeWithNotFirstObject = createTypeChecker([
    '-: node.elements.0 -> ObjectExpression',
    isElementsMoreThenThree,
]);

const isElementsMoreThenMaxWithFirstString = createTypeChecker([
    '-: node.elements.0 -> !StringLiteral',
    isElementsMoreThenMax,
]);

export const isMultiLine = createTypeChecker([
    ['-', isMaxElementLengthInOneLine],
    isMoreThenMaxElementLengthInOneLine,
    isElementsMoreThenMaxWithFirstString,
    isElementsMoreThenThreeWithNotFirstObject,
    isSimpleAndNotEmptyObject,
    ['-', isOneSimple],
    ['-', isOneSpread],
    ['-', isIdentifierAndIdentifier],
    ['-', isCallInsideArrow],
    ['-', isIncreaseIndent],
    ['-', isInsideLoop],
    ['-', isBooleanAndSimple],
    ['-', isNullAndSimple],
    ['-', isSimpleAndCall],
    ['-', isShortTwoSimplesInsideCall],
    ['-', isTwoStringsDifferentLength],
    ['-', isTwoSimplesInsideObjectProperty],
    ['-', isStringAndArray],
    ['-', isStringAndMember],
    ['-', isStringAndIdentifier],
    ['-', isIdentifierAndString],
    ['-', isSimpleAndObject],
    ['-', isSiblingIsArray],
    ['-', isStringsInsideArray],
    tooLong,
    isCoupleLines,
    isMultiLineChecks,
]);

function isMultiLineChecks(path) {
    const elements = path.get('elements');
    
    if (!isNumbers(elements) && !isInsideForOf(path) && isLastArg(path) && !isParentProperty(path))
        return MULTI_LINE;
    
    return ONE_LINE;
}

function isOneSimple(path) {
    const elements = path.get('elements');
    
    if (elements.length !== 1)
        return false;
    
    const [first] = elements;
    
    if (first.isStringLiteral() && first.node.value.length > 10)
        return false;
    
    if (!first.isIdentifier() && isSimple(first))
        return true;
    
    if (first.isCallExpression())
        return false;
    
    return first.isMemberExpression();
}

function isTwoStringsDifferentLength(path) {
    const {elements} = path.node;
    const [a, b] = elements;
    
    if (elements.length > 2)
        return false;
    
    if (!isStringLiteral(a) || !isStringLiteral(b))
        return false;
    
    const aLength = a.value.length;
    const bLength = b.value.length;
    
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

export function isIncreaseIndent(path) {
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

const isInsideCallLoop = createTypeChecker([
    ['-: -> !', isInsideCall],
    '+: parentPath.parentPath -> ForOfStatement',
]);

const isStringAndObject = (elements) => {
    const first = elements.at(0);
    const last = elements.at(-1);
    
    return isStringLiteral(first) && isObjectExpression(last);
};

export const isCurrentNewLine = (path) => {
    if (path.isSpreadElement())
        return true;
    
    return !path.isObjectExpression();
};
