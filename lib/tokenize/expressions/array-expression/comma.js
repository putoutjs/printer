import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {
    callWithNext,
    isSimpleAndNotEmptyObject,
} from '#is';

const {
    isSpreadElement,
    isCallExpression,
    isObjectExpression,
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

