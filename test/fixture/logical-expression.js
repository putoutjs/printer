const a = {
    ...DEV && {
        devtool: 'eval',
    },
};

if (a && b && c)
    if (a || b || c)
        fn();

const {isJSX, sourceFileName} = options || {};