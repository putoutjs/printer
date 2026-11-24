import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {callWithNext} from '#is';
import {isTrailingLineArg} from '../call-expression/comments.js';
import {isBreaklineBeforeClosingSquareBrace} from './breakline.js';
import {
    isLastHole,
    isLastOption,
    isMultilineOption,
    isNeedsIndentBeforeElementOption,
    isTrailingCommaOption,
} from './is.js';

const {isObjectExpression} = types;

const isCommaAfterElementByOption = createTypeChecker([
    ['+: -> !', isLastOption],
    ['-: -> !', isNeedsIndentBeforeElementOption],
    ['+', isTrailingCommaOption],
]);

const isTrailingLineElement = (a, {element}) => isTrailingLineArg(element);

export const isCommaAfterElement = createTypeChecker([
    ['-', isTrailingLineElement],
    ['+', isLastHole],
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
    ['-: -> SpreadElement'],
    ['-: -> Identifier'],
    ['+: -> !CallExpression'],
]);

export const isSpaceAfterComa = createTypeChecker([
    ['-', isLastOption],
    ['+', callWithNext(isSimpleBetweenObjects)],
    ['+: -> !ObjectExpression'],
]);
