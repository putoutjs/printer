'use strict';

const {TYPES} = require('../types');
const toSnakeCase = require('just-snake-case');
const {DEBUG} = process.env;

module.exports.createDebug = (tokens) => (a) => {
    if (!DEBUG)
        return;
    
    tokens.push({
        type: TYPES.DEBUG,
        value: `/*__${toSnakeCase(a)}*/`,
    });
};
