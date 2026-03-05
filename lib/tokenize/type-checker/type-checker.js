import {jessy} from 'jessy';
import {instrument} from '#type-checker/instrument';
import {parseOperation, parseTypeNames} from './parsers.js';
import {equal, maybeCall} from './comparators.js';

export const createTypeChecker = (deepness, typeNames) => {
    if (!typeNames) {
        typeNames = deepness;
        deepness = '';
    }
    
    const tuples = parseTypeNames(typeNames);
    
    return instrument(typeNames, (path, options) => {
        let i = deepness.split('.').length;
        
        while (--i)
            path = path?.parentPath;
        
        if (!path)
            return [
                Infinity,
                false,
            ];
        
        for (const [index, [operation, typeName]] of tuples.entries()) {
            const [result, selector, not] = parseOperation(operation);
            let currentPath = path;
            
            if (selector)
                currentPath = jessy(selector, path);
            
            const {type} = currentPath;
            
            if (equal(not, type, typeName))
                return [index, result];
            
            if (maybeCall(typeName, not, currentPath, options))
                return [index, result];
        }
        
        return [
            Infinity,
            false,
        ];
    });
};
