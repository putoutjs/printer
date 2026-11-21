import {env as _env} from 'node:process';

const STACK_INDEX = 3;

const parseCallLocation = ({stack}, stackIndex) => stack.split('\n')[stackIndex];

const Coverage = new Map();

export const instrument = (typeNames, fn, overrides = {}) => {
    const {
        env = _env,
        coverage = Coverage,
        instrumentName = 'TYPE_CHECK',
        stackIndex = STACK_INDEX,
    } = overrides;
    
    const error = Error();
    const location = parseCallLocation(error, stackIndex);
    const on = env[instrumentName];
    const covered = new Set();
    
    if (on && !location.includes('type-checker.spec.js'))
        coverage.set(location, {
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
