import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';

const {isFunction} = types;

export function isNeedIndent(path) {
    if (hasComplexAttribute(path))
        return false;
    
    const insideFn = path.parentPath.isArrowFunctionExpression();
    const insideJSX = path.parentPath.isJSXElement();
    const insideCall = path.parentPath.parentPath.isCallExpression();
    
    return insideJSX || insideFn && insideCall;
}

const isComplexAttribute = createTypeChecker([
    ['+: -> JSXSpreadAttribute'],
    ['-: node.value -> !JSXExpressionContainer'],
    ['+: parentPath.node.attributes.length', '>', 1],
    ['+: node.value.expression', isFunction],
]);

function hasComplexAttribute(path) {
    const attributes = path.get('openingElement.attributes');
    
    for (const attribute of attributes) {
        if (isComplexAttribute(attribute))
            return true;
    }
    
    return false;
}
