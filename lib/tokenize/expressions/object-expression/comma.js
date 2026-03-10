import {createTypeChecker} from '#type-checker';
import {
    isMultilineOption,
    isTrailingCommaOption,
} from '../array-expression/is.js';

const isCouple = (a) => a > 1;
const isLastProperty = ({node, parentPath}) => node === parentPath.node.properties.at(-1);

const isCoupleOrManyLines = createTypeChecker([
    ['+: parentPath.node.properties.length ->', isCouple],
    ['+', isMultilineOption],
]);

export const isCommaAfterProperty = createTypeChecker([
    ['-: -> !SpreadElement'],
    ['-: -> !', isCoupleOrManyLines],
    ['+: -> !', isLastProperty],
    ['+', isTrailingCommaOption],
]);
