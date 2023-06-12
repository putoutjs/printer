const shouldBreakline = satisfy([
    isNewlineBetweenSiblings,
    isNotLastBody,
    isStrictMode,
]);