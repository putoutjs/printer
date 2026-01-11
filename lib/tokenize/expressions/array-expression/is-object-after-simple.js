import {isNextObject, isPrevObject} from '#is';

const SIMPLE_TYPES = [
    'ArrayExpression',
    'ObjectExpression',
    'SpreadElement',
    'CallExpression',
    'Identifier',
    'NewExpression',
];

export const isObjectAfterSimple = (a) => {
    const {type} = a;
    
    if (!isNextObject(a) || isPrevObject(a))
        return false;
    
    return SIMPLE_TYPES.includes(type);
};

export const isNextSimple = (a) => {
    const {type} = a.getNextSibling();
    
    return SIMPLE_TYPES.includes(type);
};
