const obj = {
    ...(a && b),
    ...DEV && {
        devtool: 'eval',
    },
};