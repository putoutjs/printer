const maybeFile = (ast) => isFile(ast) ? ast : {
    type: 'File',
    program: ast, // maybeProgram(ast),
};

// returns
`
const a = (b, c) => {
    const d = 5;
    return a;
};
`;