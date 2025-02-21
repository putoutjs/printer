const eslint = new FlatESLint({
    cwd,
    fix,
    overrideConfig: [
        ...maybeArray(config), {
            ignores: ['!.*'],
        },
    ],
    ...overrideConfigFile && {
        overrideConfigFile,
    },
});