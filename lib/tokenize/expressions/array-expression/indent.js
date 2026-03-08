import {types} from '@putout/babel';
import {isInsideArray} from '#is';
import {createTypeChecker} from '#type-checker';

const isTwoLongStrings = (path) => {
    const [a, b] = path.node.elements;
    const LONG_STRING = 20;
    
    if (!isStringLiteral(a) || !isStringLiteral(b))
        return false;
    
    return a.value.length > LONG_STRING;
};

const {
    isStringLiteral,
    isArrayExpression,
    isObjectExpression,
    isTemplateLiteral,
} = types;

const isObjectAfterString = (path) => {
    const [first, second] = path.node.elements;
    
    if (!first || !second)
        return false;
    
    if (!isObjectExpression(second))
        return false;
    
    if (isStringLiteral(first))
        return true;
    
    return isTemplateLiteral(first);
};

export const isIndentElement = createTypeChecker([
    ['-', isArrayInsideArray],
    ['-', isObjectAfterString],
    ['+: -> !', isTwoLongStrings],
    ['+: -> !', isInsideArray],
]);

export function isArrayInsideArray(path) {
    if (!path.isArrayExpression() || !path.parentPath.isArrayExpression())
        return false;
    
    const parentElements = path.parentPath.node.elements;
    const parentHasArrays = parentElements.filter(isArrayExpression).length;
    const lastNotArray = !isArrayExpression(parentElements.at(-1));
    
    if (parentHasArrays && lastNotArray)
        return false;
    
    const {length} = parentElements;
    
    return length <= 3 && length !== 1;
}
