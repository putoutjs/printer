const isObject = (a) => a && typeof a === 'object';
const isBool = (a) => typeof a === 'boolean';

export const ROUND_BRACES_DEFAULTS = {
    arrow: true,
    sequence: true,
    assign: false,
    new: true,
};

export const ROUND_BRACES_ENABLED = {
    arrow: true,
    sequence: true,
    assign: true,
    new: true,
};

export const ROUND_BRACES_DISABLED = {
    arrow: false,
    sequence: false,
    assign: false,
    new: false,
};

export const parseRoundBraces = ({roundBraces}) => {
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
