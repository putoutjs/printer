const maybeFile = (ast) => isFile(ast) ? ast : {
    type: 'File',
    program: ast, //maybeProgram(ast),
};