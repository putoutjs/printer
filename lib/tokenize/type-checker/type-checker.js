const {isArray} = Array;
const isString = (a) => typeof a === 'string';
const isFn = (a) => typeof a === 'function';

const exec = (fn, a) => isFn(fn) && fn(a);

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
        
        const {type} = path;
        
        for (const [result, typeName] of tuples) {
            if (type === typeName)
                return parseResult(result);
            
            if (exec(typeName, path))
                return parseResult(result);
        }
        
        return false;
    };
};

const parseResult = (a) => {
    if (isString(a))
        return a === '+';
    
    return a;
};

function parseTypeNames(typeNames) {
    const tuples = [];
    
    if (isArray(typeNames)) {
        for (const typeName of typeNames) {
            if (Array.isArray(typeName)) {
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
