'use strict';

const {tokenize} = require('./tokenize/tokenize');
const {printTokens} = require('./print-tokens');
const {isASTJSON} = require('./is-json');
const {assign} = Object;

module.exports.print = (ast, overrides = {}) => {
    if (isASTJSON(ast))
        assign(overrides, {
            format: {
                quote: `"`,
            },
        });
    
    const tokens = tokenize(ast, overrides);
    
    return printTokens(tokens);
};
