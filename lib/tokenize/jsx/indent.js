import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';

const {isFunction} = types;

export const isNeedIndent = createTypeChecker([
    ['-', hasComplexAttribute],
    ['+: parentPath -> JSXElement'],
    ['-: parentPath.parentPath -> !CallExpression'],
    ['+: parentPath -> ArrowFunctionExpression'],
]);

const isComplexAttribute = createTypeChecker([
    ['+: -> JSXSpreadAttribute'],
    ['-: node.value -> !JSXExpressionContainer'],
    ['+: parentPath.node.attributes.length', '>', 1],
    ['+: node.value.expression', isFunction],
]);

function hasComplexAttribute(path) {
    const attributes = path.get('openingElement.attributes');
    
    if (attributes.length > 4)
        return true;
    
    for (const attribute of attributes) {
        if (isComplexAttribute(attribute))
            return true;
    }
    
    return false;
}
