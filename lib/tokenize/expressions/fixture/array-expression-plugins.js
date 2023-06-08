putout(source, {
    plugins: [
        'remove-unused-variables',
        ['minify', minify],
        ['escover', require('escover/mark')],
        ['mock-import', await import('mock-import')],
    ],
});