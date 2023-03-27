const isFirstStatement = (path) => path.get('body.0')?.isStatement();

if (path?.parentPath?.isExpressionStatement?.()) {}