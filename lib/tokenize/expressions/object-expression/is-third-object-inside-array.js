import {types} from '@putout/babel';

const {
    isArrayExpression,
    isCallExpression,
    isIdentifier,
} = types;

export const isThirdObjectInsideArray = ({parentPath}) => {
    if (!isArrayExpression(parentPath))
        return false;
    
    const [, second] = parentPath.node.elements;
    
    return isCallExpression(second) && !!isIdentifier(second);
};
