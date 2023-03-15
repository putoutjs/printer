'use strict';

const {tokenize} = require('./tokenize/tokenize');
const {printTokens} = require('./print-tokens');

module.exports.print = (ast) => {
    const tokens = tokenize(ast);
    return printTokens(tokens);
};
