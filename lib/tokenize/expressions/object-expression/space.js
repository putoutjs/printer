import {createTypeChecker} from '#type-checker';
import {isMultilineOption} from '../array-expression/is.js';

const isLast = ({node, parentPath}) => node === parentPath.node.properties.at(-1);

export const isSpaceAfterComma = createTypeChecker([
    ['-', isMultilineOption],
    ['+: -> !', isLast],
]);
