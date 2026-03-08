import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {
    isInsideArray,
    isInsideCall,
    isStringAndArray,
} from '#is';
import {
    isMultilineOption,
    isNeedsToHideIndentOption,
} from './is.js';

const isTwoLongStrings = (path) => {
    const [a, b] = path.node.elements;
    const LONG_STRING = 20;
    
    if (!isStringLiteral(a) || !isStringLiteral(b))
        return false;
    
    return a.value.length > LONG_STRING;
};

const {
    isStringLiteral,
    isArrayExpression,
    isObjectExpression,
    isTemplateLiteral,
    isBooleanLiteral,
} = types;

const isInsideCallLoop = createTypeChecker([
    ['-: -> !', isInsideCall],
    ['+: parentPath.parentPath -> ForOfStatement'],
]);

const isStringAndObject = (path) => {
    const {elements} = path.node;
    const first = elements.at(0);
    const last = elements.at(-1);
    
    return isStringLiteral(first) && isObjectExpression(last);
};

const isBooleanAndObject = (path) => {
    const [a, b] = path.node.elements;
    return isBooleanLiteral(a) && isObjectExpression(b);
};

const isObjectAfterString = (path) => {
    const [first, second] = path.node.elements;
    
    if (!first || !second)
        return false;
    
    if (!isObjectExpression(second))
        return false;
    
    if (isStringLiteral(first))
        return true;
    
    return isTemplateLiteral(first);
};

export const isIncreaseIndent = createTypeChecker([
    ['-: node.elements.length -> !', Boolean],
    ['+', isBooleanAndObject],
    ['-', isInsideCallLoop],
    ['+: node.elements.0 -> ObjectExpression'],
    ['-: node.elements.1 -> SpreadElement'],
    ['+', isStringAndObject],
]);

export const isIndentElement = createTypeChecker([
    ['-', isArrayInsideArray],
    ['-', isObjectAfterString],
    ['+: -> !', isTwoLongStrings],
    ['+: -> !', isInsideArray],
]);

export const isNeedIndent = createTypeChecker([
    ['-: -> !', isIndentElement],
    ['+: -> !', isIncreaseIndent],
]);

export function isArrayInsideArray(path) {
    if (!path.isArrayExpression() || !path.parentPath.isArrayExpression())
        return false;
    
    const parentElements = path.parentPath.node.elements;
    const parentHasArrays = parentElements.filter(isArrayExpression).length;
    const lastNotArray = !isArrayExpression(parentElements.at(-1));
    
    if (parentHasArrays && lastNotArray)
        return false;
    
    const {length} = parentElements;
    
    return length <= 3 && length !== 1;
}

const isTwo = (a) => a === 2;

export const isHideIndent = createTypeChecker([
    ['-: -> !', isInsideArray],
    ['-: parentPath -> !', isStringAndArray],
    ['+: parentPath.node.elements.length', isTwo],
]);

const isLastElementObjectExpression = ({node}) => isObjectExpression(node.elements.at(-1));

export const isSecondIndent = createTypeChecker([
    ['-: -> !', isMultilineOption],
    ['+', isNeedsToHideIndentOption],
    ['-: ->', isArrayInsideArray],
    ['+: -> !', isLastElementObjectExpression],
]);

export function maybeSecondIndent(path, printer, semantics, options) {
    const {maybe, indent} = printer;
    const {multiline} = options;
    const needsToHideIndent = isHideIndent(path);
    
    const needsToMakeSecondIndent = isSecondIndent(path, {
        multiline,
        needsToHideIndent,
    });
    
    if (needsToMakeSecondIndent) {
        maybe.indent.dec(needsToHideIndent);
        indent();
        maybe.indent.inc(needsToHideIndent);
    }
}
