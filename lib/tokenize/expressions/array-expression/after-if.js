import {
    isCoupleLines,
    isIdentifierAndIdentifier,
    isStringAndIdentifier,
} from '#is';
import {isInsideOneElementArray} from './before-if.js';

export const afterIf = (path) => {
    const {parentPath} = path;
    
    if (!parentPath.isArrayExpression())
        return false;
    
    if (isCoupleLines(parentPath))
        return false;
    
    if (isStringAndIdentifier(path) && isInsideOneElementArray(path))
        return true;
    
    return isIdentifierAndIdentifier(path);
};
