import {
    isCoupleLines,
    isIdentifierAndIdentifier,
} from '#is';
import {createTypeChecker} from '#type-checker';
import {isInsideOneElementArray} from './before-if.js';

export const afterIf = createTypeChecker([
    ['-: parentPath -> !ArrayExpression'],
    ['-: parentPath ->', isCoupleLines],
    ['+', isIdentifierAndIdentifier],
    ['+', isInsideOneElementArray],
]);
