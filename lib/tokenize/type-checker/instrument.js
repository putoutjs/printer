import {env as _env} from 'node:process';

const STACK_INDEX = 3;

const parseCallLocation = ({stack}) => stack.split('\n')[STACK_INDEX];

const Coverage = new Map();

export const instrument = (typeNames, fn, overrides = {}) => {
    const {
        env = _env,
        coverage = Coverage,
        instrument = true,
    } = overrides;
    
    const {length} = typeNames;
    const error = Error();
    const location = parseCallLocation(error);
    const on = instrument && env.TYPE_CHECK;
    const covered = new Set();
    
    if (on && !location.includes('type-checker.spec.js'))
        coverage.set(location, {
            length,
            covered,
            typeNames,
        });
    
    return (path, options) => {
        const [index, result] = fn(path, options);
        
        if (on && index !== Infinity)
            covered.add(index);
        
        return result;
    };
};

export const getCoverage = () => Coverage;
