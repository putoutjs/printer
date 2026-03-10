import {createTypeChecker} from '#type-checker';
import {isManyLinesOption} from './is.js';
import {isTrailingCommaOption} from '../array-expression/is.js';

const isCouple = (a) => a > 1;

const isLastProperty = ({node, parentPath}) => node === parentPath.node.properties.at(-1);

const isCoupleOrManyLines = createTypeChecker([
    ['+: parentPath.node.properties.length ->', isCouple],
    ['+', isManyLinesOption],
]);

const isLastOrTrailingComma = createTypeChecker([
    ['+: -> !', isLastProperty],
    ['+', isTrailingCommaOption],
]);

export const isCommaAfterProperty = createTypeChecker([
    ['-: -> !SpreadElement'],
    ['-: -> !', isCoupleOrManyLines],
    ['+', isLastOrTrailingComma],
]);
