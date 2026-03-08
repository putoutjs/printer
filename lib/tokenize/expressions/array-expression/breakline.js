import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {isSimpleAndNotEmptyObject} from '#is';

const {
    isSpreadElement,
    isCallExpression,
} = types;

const callWithLastElement = (fn) => (a) => fn(a.at(-1));

export const isBreaklineBeforeClosingSquareBrace = createTypeChecker([
    ['-: -> !', isSimpleAndNotEmptyObject],
    ['-: node.elements', callWithLastElement(isSpreadElement)],
    ['+: node.elements -> !', callWithLastElement(isCallExpression)],
]);
