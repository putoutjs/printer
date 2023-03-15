'use strict';

const {TYPES} = require('../types');

module.exports.cook = (tokens) => {
    const n = tokens.length;
    const cookedTokens = [];
    
    for (let i = 0; i < n; i++) {
        const {type, value} = tokens[i];
        const prev = tokens[i - 1];
        const prevPrev = tokens[i - 2];
        const next = tokens[i + 1];
        
        /*
        if (type !== TYPES.TOKEN)
            console.log(type);
        
        if (type === TYPES.NEWLINE && next?.type === TYPES.LINEBREAK) {
            console.log('[skipped]');
            continue;
        }
        
        if (type === TYPES.LINEBREAK && next?.type === TYPES.LINEBREAK) {
            console.log('[skipped]');
            continue;
        }
         */
        
        cookedTokens.push(value);
    }
    
    return cookedTokens;
};

