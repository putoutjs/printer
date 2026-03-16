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
            tuples.push(parseComparison(typeName));
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

const equal = (a) => (b) => b === a;
const more = (a) => (b) => b > a;
const less = (a) => (b) => b < a;
const moreOrEqual = (a) => (b) => b >= a;
const lessOrEqual = (a) => (b) => b <= a;

const CMP = {
    '=': equal,
    '>': more,
    '<': less,
    '>=': moreOrEqual,
    '<=': lessOrEqual,
};

function parseComparison(typeName) {
    if (typeName.length === 3) {
        const [result, comparison, value] = typeName;
        
        return [result, CMP[comparison](value)];
    }
    
    return typeName;
}
