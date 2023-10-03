'use strict';

const {tokenize} = require('./tokenize/tokenize');
const {printTokens} = require('./print-tokens');
const {maybeJSON} = require('./json');

module.exports.print = (ast, overrides = {}) => {
    maybeJSON(ast, overrides);
    const tokens = tokenize(ast, overrides);
    
    return printTokens(tokens);
};

module.exports.visitors = require('./tokenize/visitors');
