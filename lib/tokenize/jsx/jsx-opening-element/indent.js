import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {isCoupleLines} from '#is';

const {
    isObjectProperty,
    isCallExpression,
    isJSXElement,
    isJSXExpressionContainer,
    isJSXFragment,
    isLogicalExpression,
    isFunction,
} = types;

const isIdentableParent = createTypeChecker([
    isObjectProperty,
    isCallExpression,
    isJSXElement,
    isJSXExpressionContainer,
    isJSXFragment,
    isLogicalExpression,
]);

const hasJSXExpression = ({value}) => isJSXExpressionContainer(value);

const hasFnAttribute = (path) => {
    for (const attribute of path.node.attributes.filter(hasJSXExpression)) {
        if (isFunction(attribute.value.expression))
            return true;
    }
    
    return false;
};

export const isIndentBefore = createTypeChecker([
    ['+: parentPath.parentPath -> !', isIdentableParent],
    ['-: parentPath.parentPath -> !CallExpression'],
    ['+', hasFnAttribute],
]);

export const isIndent = createTypeChecker([
    ['-: -> !', isCoupleLines],
    ['+: parentPath.parentPath -> JSXElement'],
    ['+: parentPath.parentPath -> CallExpression'],
]);
