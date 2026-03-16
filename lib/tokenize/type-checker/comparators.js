const isFn = (a) => typeof a === 'function';
const isString = (a) => typeof a === 'string';
const maybeNot = (not, a) => not ? !a : a;

export const equal = (not, a, b) => {
    if (!a)
        return maybeNot(not, false);
    
    const {type} = a;
    
    if (!isString(b))
        return false;
    
    return maybeNot(not, type === b);
};

export const maybeCall = (fn, not, a, options) => {
    if (!isFn(fn))
        return false;
    
    const result = fn(a, options);
    
    if (not)
        return !result;
    
    return result;
};
