putout(source, {
    plugins: [
        ['mock-import', await import('mock-import')],
    ],
});

putout(source, {
    plugins: [
        'remove-unused-variables',
        ['minify', minify],
    ],
});