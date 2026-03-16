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
    isInsideArray,
} from '#is';
import {isIncreaseIndent} from './indent.js';
import {isMultilineOption} from './is.js';

const isParentProperty = (path) => path.find(isObjectProperty);

const isNumbersArray = createTypeChecker([
    ['-: node.elements -> !', isNumbers],
    ['+: -> !', isParentProperty],
]);

const isStringAndString = (path) => {
    const {elements} = path.node;
    const [a, b] = elements;
    
    return isStringLiteral(a) && isStringLiteral(b);
};

const isStringsInsideArray = createTypeChecker([
    ['-: -> !', isStringAndString],
    ['-: -> !', isInsideArray],
    ['+: parentPath.node.elements.0 -> ArrayExpression'],
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
    isNumericLiteral,
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

const isSiblingIsArray = (path) => {
    if (path.getNextSibling().isArrayExpression())
        return true;
    
    return path
        .getPrevSibling()
        .isArrayExpression();
};

const isMoreThenMaxLiteralLength = (path, {maxElementLengthInOneLine}) => {
    const {elements} = path.node;
    const [first] = elements;
    
    if (!isStringLiteral(first))
        return false;
    
    return first.value.length > maxElementLengthInOneLine;
};

const isMoreThenMaxIdentifierLength = (path, {maxElementLengthInOneLine}) => {
    const [first] = path.node.elements;
    
    if (!isIdentifier(first))
        return false;
    
    return first.name.length > maxElementLengthInOneLine;
};

const hasObjects = (path) => {
    const {elements} = path.node;
    const literals = elements.filter(isObjectExpression);
    
    return literals.length;
};

const isMoreThenMaxElementLengthInOneLine = createTypeChecker([
    ['-: node.elements.length', '<', 2],
    ['-: -> !', isInsideCall],
    ['-', hasObjects],
    ['+', isMoreThenMaxLiteralLength],
    ['+', isMoreThenMaxIdentifierLength],
]);

const isElementsMoreThenMax = (path, {maxElementsInOneLine}) => {
    const {elements} = path.node;
    return elements.length > maxElementsInOneLine;
};

const isElementsMoreThenThree = (path) => {
    const {elements} = path.node;
    return elements.length > 3;
};

const isElementsMoreThenThreeWithNotFirstObject = createTypeChecker([
    ['-: node.elements.0 -> ObjectExpression'],
    ['+', isElementsMoreThenThree],
]);

const isElementsMoreThenMaxWithFirstString = createTypeChecker([
    ['-: node.elements.0 -> !StringLiteral'],
    ['+', isElementsMoreThenMax],
]);

const isBody = ({node, parentPath}) => node === parentPath.node.body;

const isBodyWithOneElement = createTypeChecker([
    ['-: node.elements.length -> !', '=', 1],
    ['+', isBody],
]);

export const isMultiLine = createTypeChecker([
    ['-: node.elements.length -> -'],
    ['+', isBodyWithOneElement],
    ['+', isMoreThenMaxElementLengthInOneLine],
    ['+', isElementsMoreThenMaxWithFirstString],
    ['+', isElementsMoreThenThreeWithNotFirstObject],
    ['+', isSimpleAndNotEmptyObject],
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
    ['-', isNumbersArray],
    ['+', tooLong],
    ['+', isCoupleLines],
]);

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
        if (isNumericLiteral(element))
            return true;
    }
    
    return false;
}

export const isIndentBeforeElement = createTypeChecker([
    ['-: -> !', isMultilineOption],
    ['+: -> SpreadElement'],
    ['+: -> !ObjectExpression'],
]);

