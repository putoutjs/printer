module.exports = [
    ...safeAlign, {
        rules: {
            'node/no-unsupported-features/node-builtins': 'off',
        },
    },
    ...matchToFlat(match),
];

module.exports.match = match;