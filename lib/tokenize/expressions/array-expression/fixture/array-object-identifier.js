export default createESLintConfig([
    safeAlign, {
        files: ['*.js'],
        rules: {
            'import/no-extraneous-dependencies': 'error',
            '@stylistic/js/semi': 'off',
        },
        plugins: {
            import: importPlugin,
        },
    },
    scriptsConfig,
    monoConfig, {
        languageOptions: {
            sourceType: 'module',
            ecmaVersion: 'latest',
        },
        ignores: ['**/fixture'],
    },
]);