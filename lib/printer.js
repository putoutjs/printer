'use strict';

const {tokenize} = require('./tokenize/tokenize');
const {printTokens} = require('./print-tokens');
const {maybeJSON} = require('./json');

const {maybePlugin} = require('./tokenize/maybe/index');
const visitors = require('./tokenize/visitors');

module.exports.print = (ast, overrides = {}) => {
    const options = maybeJSON(ast, overrides);
    const tokens = tokenize(ast, options);
    
    return printTokens(tokens);
};

module.exports.visitors = visitors;
module.exports.maybePlugin = maybePlugin;
