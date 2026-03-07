import {jessy} from 'jessy';
import {instrument} from '#type-checker/instrument';
import {parseOperation, parseTypeNames} from './parsers.js';
import {equal, maybeCall} from './comparators.js';

const SKIP = [
    Infinity,
    false,
];

export const createTypeChecker = (typeNames) => {
    const tuples = parseTypeNames(typeNames);
    
    return instrument(typeNames, (path, options) => {
        for (const [index, [operation, typeName]] of tuples.entries()) {
            const [result, selector, not] = parseOperation(operation);
            let currentPath = path;
            
            if (selector)
                currentPath = jessy(selector, path);
            
            if (!currentPath)
                return SKIP;
            
            const {type} = currentPath;
            
            if (equal(not, type, typeName))
                return [index, result];
            
            if (maybeCall(typeName, not, currentPath, options))
                return [index, result];
        }
        
        return SKIP;
    });
};
