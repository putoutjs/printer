import {createTuple} from './create-tuple.js';

const isString = (a) => typeof a === 'string';
const {isArray} = Array;

export const parseOperation = (operation) => {
    const [result, command] = operation.split(':');
    const parsedResult = parseResult(result);
    
    if (!command)
        return [parsedResult, '', ''];
    
    const [selector, not] = command.split(/ ->\s?/);
    
    return [parsedResult, selector.trim(), not];
};

const parseResult = (a) => a === '+';

export function parseTypeNames(typeNames) {
    const tuples = [];
    
    for (const typeName of typeNames) {
        if (isArray(typeName) && typeName.length === 1) {
            const [first] = typeName;
            const tuple = createTuple(first);
            
            tuples.push(tuple);
            continue;
        }
        
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
