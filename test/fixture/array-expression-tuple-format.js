const test = createTest(__dirname, {
    plugins: [
        ['for-of/n', forN],
    ],
});

const test1 = createTest(__dirname, {
    plugins: [['for-of/n', forN]],
});

const test2 = createTest(__dirname, {
    printer: 'putout',
    plugins: [[jest, jest]],
});