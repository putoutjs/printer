'use strict';

module.exports.parseQuotes = ({quote}) => {
    if (quote === '"')
        return {
            escapeSingleQuote: false,
            escapeDoubleQuote: true,
        };
    
    return {
        escapeSingleQuote: true,
        escapeDoubleQuote: false,
    };
};
