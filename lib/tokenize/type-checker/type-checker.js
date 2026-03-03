import {jessy} from 'jessy';

const {isArray} = Array;

const isString = (a) => typeof a === 'string';

const isFn = (a) => typeof a === 'function';

const equal = (not, a, b) => {
    if (!isString(b))
        return false;
    
    if (not)
        return a !== b;
    
    return a === b;
};

const exec = (fn, not, a) => {
    if (!isFn(fn))
        return false;
    
    const result = fn(a);
    
    if (not)
        return !result;
    
    return result;
};

export const createTypeChecker = (deepness, typeNames) => {
    if (!typeNames) {
        typeNames = deepness;
        deepness = '';
    }
    
    const tuples = parseTypeNames(typeNames);
    
    return (path) => {
        let i = deepness.split('.').length;
        
        while (--i)
            path = path?.parentPath;
        
        if (!path)
            return false;
        
        for (const [operation, typeName] of tuples) {
            const [result, selector, not] = parseOperation(operation);
            let currentPath = path;
            
            if (selector)
                currentPath = jessy(selector, path);
            
            const {type} = currentPath;
            
            if (equal(not, type, typeName))
                return result;
            
            if (exec(typeName, not, currentPath))
                return result;
        }
        
        return false;
    };
};

const parseOperation = (operation) => {
    const [result, command] = operation.split(':');
    const parsedResult = parseResult(result);
    
    if (!command)
        return [parsedResult, '', ''];
    
    const [selector, not] = command.split(' -> ');
    
    return [parsedResult, selector.trim(), not];
};

const parseResult = (a) => a === '+';

function parseTypeNames(typeNames) {
    const tuples = [];
    
    if (isArray(typeNames)) {
        for (const typeName of typeNames) {
            if (isArray(typeName)) {
                tuples.push(typeName);
                continue;
            }
            
            tuples.push(['+', typeName]);
        }
        
        return tuples;
    }
    
    for (const typeName of typeNames.include) {
        tuples.push(['+', typeName]);
    }
    
    for (const typeName of typeNames.exclude) {
        tuples.push(['-', typeName]);
    }
    
    return tuples;
}
