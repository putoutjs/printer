const a = {
    'padding-line-between-statements': [
        'error',
        ...getPaddingExport(),
        ...getPaddingCjsExport(),
        ...getPaddingImport(),
        ...getPaddingCjsImport(),
        ...getPaddingIf(),
        ...getPaddingFor(), {
            blankLine: 'always',
            prev: 'while',
            next: 'return',
        }, {
            blankLine: 'always',
            prev: '*',
            next: 'while',
        }, {
            blankLine: 'always',
            prev: '*',
            next: 'function',
        }, {
            blankLine: 'any',
            prev: 'cjs-export',
            next: 'function',
        }],
};