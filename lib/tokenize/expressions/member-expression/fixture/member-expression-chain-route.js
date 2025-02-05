router
    .route(`${prefix}/*`)
    .get(terminalFn(options));