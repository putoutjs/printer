export default defineConfig([
    safeAlign,
    matchToFlat(match), {
        ignores: ['**/fixture'],
    },
]);

export default [
    hello,
    world, {
        languageOptions: {
            sourceType: 'module',
        },
    },
];