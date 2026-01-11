import {types} from '@putout/babel';
import {isIndented} from '#is';

const {
    isStringLiteral,
    isArrayExpression,
} = types;

export const isInsideArray = (path) => path.parentPath.isArrayExpression();

export const isArrayIndented = (path) => {
    const elements = path.get('elements');
    
    if (isArrayInsideArray(path))
        return false;
    
    const [first] = elements;
    
    return !isTwoLongStrings(elements) || !isInsideArray(path) && isIndented(first);
};

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

const isTwoLongStrings = ([a, b]) => {
    const LONG_STRING = 20;
    
    if (!isStringLiteral(a) || !isStringLiteral(b))
        return false;
    
    return a.node.value.length > LONG_STRING;
};
