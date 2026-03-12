function decodePath(path) {
    return decodeURI(path)
        .replace(url, '')
        .replace(prefixReg, '') // browser doesn't replace % -> %25% do it for him
        .replace('%%', '%25%')
        .replace(NBSP_REG, SPACE);
}

decodeURI(path)
    .replace(url, '')
    .replace(prefixReg, '') // browser doesn't replace % -> %25% do it for him
    .replace('%%', '%25%')
    .replace(NBSP_REG, SPACE) || '/';