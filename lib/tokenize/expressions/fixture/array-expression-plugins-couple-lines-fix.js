putout(source, {
    plugins: [
        'remove-unused-variables',
        ['minify', minify],
    ],
});
