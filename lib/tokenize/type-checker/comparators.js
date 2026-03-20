import {types} from '@putout/babel';

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
    
    const result = maybeCutOptions(fn, a, options);
    
    if (not)
        return !result;
    
    return result;
};

function maybeCutOptions(fn, a, options) {
    const {name} = fn;
    
    if (types[name] === fn)
        return fn(a);
    
    return fn(a, options);
}
