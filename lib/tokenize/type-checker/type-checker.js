import {jessy} from 'jessy';
import {parseOperation, parseTypeNames} from './parsers.js';
import {equal, maybeCall} from './comparators.js';

export const createTypeChecker = (deepness, typeNames) => {
    if (!typeNames) {
        typeNames = deepness;
        deepness = '';
    }
    
    const tuples = parseTypeNames(typeNames);
    
    return (path, options) => {
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
            
            if (maybeCall(typeName, not, currentPath, options))
                return result;
        }
        
        return false;
    };
};
