import {jessy} from 'jessy';
import {instrument as _instrument} from '#type-checker/instrument';
import {parseOperation, parseTypeNames} from './parsers.js';
import {equal, maybeCall} from './comparators.js';

const isString = (a) => typeof a === 'string';

const SKIP = [
    Infinity,
    false,
];

export const createTypeChecker = (typeNames, overrides = {}) => {
    const {
        instrumentCoverage = _instrument,
    } = overrides;
    
    const tuples = parseTypeNames(typeNames);
    const checkers = [];
    const results = new Set();
    
    for (const [operation, typeName] of tuples) {
        const [result, selector, not] = parseOperation(operation);
        results.add(result);
        checkers.push({
            result,
            selector,
            not,
            typeName,
        });
    }
    
    validateResults(results);
    validateTypeNames(checkers);
    
    const typeChecker = (path, options) => {
        for (const [index, {result, selector, typeName, not}] of checkers.entries()) {
            let currentPath = path;
            
            if (selector)
                currentPath = jessy(selector, path);
            
            if (equal(not, currentPath, typeName))
                return [index, result];
            
            if (maybeCall(typeName, not, currentPath, options))
                return [index, result];
        }
        
        return SKIP;
    };
    
    return instrumentCoverage(typeNames, typeChecker, overrides);
};

function validateResults(results) {
    if (!results.has(true))
        throw Error(`☝️Looks like type checker missing successful route ('+'), it will always fail`);
}

const hasTypeName = ({typeName}) => isString(typeName);

function validateTypeNames(checkers) {
    for (const {typeName} of checkers.filter(hasTypeName)) {
        if (typeName.includes(':'))
            throw Error(`☝️Looks like typeName includes ':', most likely you forget the arrow: ' -> '`);
    }
}
