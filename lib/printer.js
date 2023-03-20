'use strict';

const {tokenize} = require('./tokenize/tokenize');
const {printTokens} = require('./print-tokens');

module.exports.print = (ast, overrides) => {
    const tokens = tokenize(ast, overrides);
    return printTokens(tokens);
};
