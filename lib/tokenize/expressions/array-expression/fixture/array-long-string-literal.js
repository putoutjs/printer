const isMethodOrArrow = createTypeChecker([
    'ArrowFunctionExpression',
    'ObjectMethod',
]);

const isInsideBlockLike = createTypeChecker([
    '+: parentPath.parentPath -> TSModuleBlock',
    '-: parentPath -> !BlockStatement',
    ['+: -> !', hasFnBody],
]);