export default [
    ...safeAlign,
    ...matchToFlat(match), {
        ignores: ['**/fixture'],
    },
];