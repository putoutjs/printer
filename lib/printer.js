import {tokenize} from './tokenize/tokenize.js';
import {printTokens} from './print-tokens/index.js';
import {maybeJSON} from './json.js';

export {maybeVisitor} from './tokenize/maybe/index.js';
export * as visitors from './tokenize/visitors.js';

export const print = (ast, overrides = {}) => {
    check(ast);
    
    const options = maybeJSON(ast, overrides);
    const tokens = tokenize(ast, options);
    
    return printTokens(tokens);
};

function check(ast) {
    if (typeof ast !== 'object')
        throw Error('☝️Looks like ast not an object');
}
