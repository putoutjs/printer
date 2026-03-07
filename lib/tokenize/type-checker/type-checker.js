import {jessy} from 'jessy';
import {instrument as _instrument} from '#type-checker/instrument';
import {parseOperation, parseTypeNames} from './parsers.js';
import {equal, maybeCall} from './comparators.js';

const SKIP = [
    Infinity,
    false,
];

export const createTypeChecker = (typeNames, overrides = {}) => {
    const {
        instrumentCoverage = _instrument,
    } = overrides;
    
    const tuples = parseTypeNames(typeNames);
    const typeChecker = (path, options) => {
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
    };
    
    return instrumentCoverage(typeNames, typeChecker, overrides);
};
