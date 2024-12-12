pp$8.shouldParseExportStatement = function() {
    return this.type.keyword === 'var'
        || this.type.keyword === 'const'
        || this.type.keyword === 'class'
        || this.type.keyword === 'function'
        || this.isLet()
        || this.isAsyncFunction()
        || !this.type.keyword;
};

if (a || b || c || d || e || f)
    exit();

const e = a
    || b
    || c
    || d
    || e
    || f;

const z = a
    && b
    && c
    && d
    && e
    && f;