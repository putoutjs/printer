import {createTypeChecker} from '#type-checker';
import {
    isCoupleLines,
    isIdentifierAndIdentifier,
    isInsideArray,
} from '#is';

export const isInsideOneElementArray = ({parentPath}) => {
    const {elements} = parentPath.node;
    return elements.length === 1;
};

export const beforeIf = createTypeChecker([
    ['-: -> !', isInsideArray],
    ['-: parentPath ->', isCoupleLines],
    ['+', isIdentifierAndIdentifier],
    ['+', isInsideOneElementArray],
]);
