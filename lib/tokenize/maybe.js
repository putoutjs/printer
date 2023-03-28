'use strict';

const {
    isProgram,
    isFile,
    File,
    ExpressionStatement,
    Program,
} = require('@babel/types');

const maybeProgram = (ast) => isProgram(ast) ? ast : Program([
    ExpressionStatement(ast),
]);

module.exports.maybeFile = (ast) => isFile(ast) ? ast : File(maybeProgram(ast));
