'use strict';

module.exports.cook = (tokens) => {
    const cookedTokens = [];
    
    for (const [i, {value}] of tokens.entries()) {
        cookedTokens.push(value);
    }
    
    return cookedTokens;
};
