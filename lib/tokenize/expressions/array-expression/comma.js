import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {callWithNext} from '#is';
import {isBreaklineBeforeClosingSquareBrace} from './breakline.js';
import {
    isLastOption,
    isMultilineOption,
    isNeedsIndentBeforeElementOption,
    isTrailingCommaOption,
} from './is.js';

const {
    isSpreadElement,
    isCallExpression,
    isObjectExpression,
    isIdentifier,
} = types;

const isCommaAfterElementByOption = createTypeChecker([
    ['+: -> !', isLastOption],
    ['-: -> !', isNeedsIndentBeforeElementOption],
    ['+', isTrailingCommaOption],
]);

export const isCommaAfterElement = createTypeChecker([
    ['+', isCommaAfterElementByOption],
    ['+', isBreaklineBeforeClosingSquareBrace],
]);

export const isNewlineAfterComma = createTypeChecker([
    ['-: -> !', isMultilineOption],
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
    ['-', isLastOption],
    ['+', callWithNext(isSimpleBetweenObjects)],
    ['+: -> !ObjectExpression'],
]);
