import {createTypeChecker} from '#type-checker';
import {
    isCoupleLines,
    isIdentifierAndIdentifier,
    isInsideArray,
    isStringAndIdentifier,
} from '#is';

export const isInsideOneElementArray = ({parentPath}) => {
    const {elements} = parentPath.node;
    return elements.length === 1;
};

const isStringAndIdentifierInsideOneElementArray = createTypeChecker([
    ['-: -> !', isStringAndIdentifier],
    ['+', isInsideOneElementArray],
]);

export const beforeIf = createTypeChecker([
    ['-: -> !', isInsideArray],
    ['-: parentPath ->', isCoupleLines],
    ['+', isIdentifierAndIdentifier],
    ['+', isStringAndIdentifierInsideOneElementArray],
]);
