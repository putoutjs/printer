const {transform} = require('putout');

transform(ast, source, {
    plugins: [
        ['math', {
            report: noop,
            replace: () => ({
                '__a * __a': '__a ** 2',
            }),
        }],
    ],
});