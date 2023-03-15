'use strict';

const {TYPES} = require('../types');

module.exports.cook = (tokens) => {
    const n = tokens.length;
    const cookedTokens = [];
    
    for (let i = 0; i < n; i++) {
        const {type, value} = tokens[i];
        
        cookedTokens.push(value);
    }
    
    return cookedTokens;
};

