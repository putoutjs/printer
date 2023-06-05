const x = [
    'importMeta',
    ['importAttributes', {
        deprecatedAssertSyntax: true,
    }],
    'dynamicImport',
    'bigInt',
];

const y = ['on', 'hello', {
    a: 'b',
}];

const maybeArray = (a) => isArray(a) ? a : [a, {}];