module.exports = [
    ...safeAlign, {
        files: ['*.js'],
        rules: {
            'import/no-extraneous-dependencies': 'error',
        },
    },
];