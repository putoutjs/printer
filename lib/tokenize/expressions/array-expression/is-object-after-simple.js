'use strict';

const {isNextObject, isPrevObject} = require('../../is');

const SIMPLE_TYPES = [
    'ArrayExpression',
    'ObjectExpression',
    'SpreadElement',
    'CallExpression',
    'Identifier',
];

module.exports.isObjectAfterSimple = (a) => {
    const {type} = a;
    
    if (!isNextObject(a) || isPrevObject(a))
        return false;
    
    return SIMPLE_TYPES.includes(type);
};

