'use strict';

const {tokenize} = require('./tokenize/tokenize');
const {printTokens} = require('./print-tokens');
const {maybeJSON} = require('./json');

module.exports.print = (ast, overrides = {}) => {
    const options = maybeJSON(ast, overrides);
    const tokens = tokenize(ast, options);
    
    return printTokens(tokens);
};

module.exports.visitors = require('./tokenize/visitors');
