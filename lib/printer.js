'use strict';

const {tokenize} = require('./tokenize/tokenize');
const {printTokens} = require('./print-tokens');
const {maybeJSON} = require('./json');

const {maybeVisitor} = require('./tokenize/maybe/index');
const visitors = require('./tokenize/visitors');

module.exports.print = (ast, overrides = {}) => {
    check(ast);
    
    const options = maybeJSON(ast, overrides);
    const tokens = tokenize(ast, options);
    
    return printTokens(tokens);
};

module.exports.visitors = visitors;
module.exports.maybeVisitor = maybeVisitor;

function check(ast) {
    if (typeof ast !== 'object')
        throw Error('☝️Looks like ast not an object');
}
