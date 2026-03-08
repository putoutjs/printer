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

const isSpaceAfterComa = createTypeChecker([
    ['+', callWithNext(isSimpleBetweenObjects)],
    ['+: -> !ObjectExpression'],
]);

export const maybePrintCommaWithSpace = (element, printer, semantics, {isLast}) => {
    const {print, maybe} = printer;
    
    if (isLast)
        return;
    
    print(',');
    maybe.print.space(isSpaceAfterComa(element));
};
