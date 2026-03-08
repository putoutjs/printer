import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {
    callWithNext,
    isSimpleAndNotEmptyObject,
} from '#is';
import {isObjectAfterSimple} from './is-object-after-simple.js';

const {
    isSpreadElement,
    isCallExpression,
    isObjectExpression,
    isIdentifier,
} = types;

const callWithLastElement = (fn) => (a) => fn(a.at(-1));

export const isCommaBeforeClosingSquareBrace = createTypeChecker([
    ['-: -> !', isSimpleAndNotEmptyObject],
    ['-: node.elements', callWithLastElement(isSpreadElement)],
    ['+: node.elements -> !', callWithLastElement(isCallExpression)],
]);

export const isNewlineAfterComma = createTypeChecker([
    ['-', callWithNext(isObjectExpression)],
    ['+: -> !ObjectExpression'],
]);

const isSimpleBetweenObjects = createTypeChecker([
    ['+', callWithNext(isObjectExpression)],
    ['-', isSpreadElement],
    ['-', isIdentifier],
    ['+: -> !', isCallExpression],
]);

export const isSpaceAfterComa = createTypeChecker([
    ['+', callWithNext(isSimpleBetweenObjects)],
    ['+: -> !ObjectExpression'],
]);
