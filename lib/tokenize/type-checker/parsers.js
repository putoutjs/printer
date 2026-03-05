import {createTuple} from './create-tuple.js';

const {isArray} = Array;
const isString = (a) => typeof a === 'string';

export const parseOperation = (operation) => {
    const [result, command] = operation.split(':');
    const parsedResult = parseResult(result);
    
    if (!command)
        return [parsedResult, '', ''];
    
    const [selector, not] = command.split(' -> ');
    
    return [parsedResult, selector.trim(), not];
};

const parseResult = (a) => a === '+';

export function parseTypeNames(typeNames) {
    const tuples = [];
    
    if (isArray(typeNames)) {
        for (const typeName of typeNames) {
            if (isArray(typeName)) {
                tuples.push(typeName);
                continue;
            }
            
            if (isString(typeName) && typeName.includes(' -> ')) {
                const tuple = createTuple(typeName);
                tuples.push(tuple);
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

