const isFn = (a) => typeof a === 'function';
const isString = (a) => typeof a === 'string';

export const equal = (not, a, b) => {
    if (!isString(b))
        return false;
    
    if (not)
        return a !== b;
    
    return a === b;
};

export const maybeCall = (fn, not, a) => {
    if (!isFn(fn))
        return false;
    
    const result = fn(a);
    
    if (not)
        return !result;
    
    return result;
};
