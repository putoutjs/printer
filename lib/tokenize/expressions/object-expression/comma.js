import {createTypeChecker} from '#type-checker';
import {
    isMultilineOption,
    isTrailingCommaOption,
} from '../array-expression/is.js';

const isLastProperty = ({node, parentPath}) => node === parentPath.node.properties.at(-1);

export const isCommaAfterProperty = createTypeChecker([
    ['+: -> !', isLastProperty],
    ['-: -> !', isMultilineOption],
    ['+', isTrailingCommaOption],
]);

export const isCommaAfterSpread = createTypeChecker([
    ['-: -> !SpreadElement'],
    ['+', isCommaAfterProperty],
]);

