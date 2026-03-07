const isInside = createTypeChecker([
    ['+: parentPath -> BlockStatement'],
]);

export const include = () => [
    'const __a = __b',
];
