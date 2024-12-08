'use strict';

const isObject = (a) => a && typeof a === 'object';
const isBool = (a) => typeof a === 'boolean';

const ROUND_BRACES_DEFAULTS = {
    arrow: true,
    sequence: true,
    assign: false,
    new: true,
};

const ROUND_BRACES_ENABLED = {
    arrow: true,
    sequence: true,
    assign: true,
    new: true,
};

const ROUND_BRACES_DISABLED = {
    arrow: false,
    sequence: false,
    assign: false,
    new: false,
};

module.exports.parseRoundBraces = ({roundBraces}) => {
    if (isObject(roundBraces))
        return {
            ...ROUND_BRACES_DEFAULTS,
            ...roundBraces,
        };
    
    if (isBool(roundBraces) && roundBraces)
        return ROUND_BRACES_ENABLED;
    
    if (isBool(roundBraces) && !roundBraces)
        return ROUND_BRACES_DISABLED;
    
    return ROUND_BRACES_DEFAULTS;
};

module.exports.ROUND_BRACES_DISABLED = ROUND_BRACES_DISABLED;
module.exports.ROUND_BRACES_ENABLED = ROUND_BRACES_ENABLED;
module.exports.ROUND_BRACES_DEFAULTS = ROUND_BRACES_DEFAULTS;
