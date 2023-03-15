'use strict';

module.exports.cook = (tokens) => {
    const cookedTokens = [];
    
    for (const [i, {
        value,
    }] of tokens.entries()) {
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

