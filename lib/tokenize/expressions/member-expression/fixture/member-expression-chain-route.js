router
    .route(`${prefix}/*`)
    .get(terminalFn(options));

router
    .get('/', get(page))
    .post('/', urlencoded, post(page));

const isLogical = (path) => path.get('argument').isLogicalExpression();