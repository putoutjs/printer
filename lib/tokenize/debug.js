'use strict';

const {stringify} = JSON;

const {TYPES} = require('../types');
const toSnakeCase = require('just-snake-case');
const {
    LOG,
    LOG_ALL,
    LOG_TOKENS,
    DEBUG,
} = process.env;
const {codeFrameColumns} = require('@babel/code-frame');

module.exports.createDebug = (tokens) => (a) => {
    if (!DEBUG)
        return;
    
    tokens.push({
        type: TYPES.DEBUG,
        value: `/*__${toSnakeCase(a)}*/`,
    });
};

module.exports.createLog = ({newline = '\n', store = createStore()} = {}) => ({type, value}) => {
    if (LOG_TOKENS) {
        console.log(codeFrameColumns(stringify({type, value}), {}, {
            highlightCode: true,
        }));
        return;
    }
    
    if (LOG_ALL) {
        console.log(codeFrameColumns(value, {}, {
            highlightCode: true,
        }));
        return;
    }
    
    if (LOG) {
        if (value === newline) {
            console.log(codeFrameColumns(store(), {}, {
                highlightCode: true,
            }));
            return;
        }
        
        store(value);
    }
};

function createStore() {
    let chunks = [];
    
    return (chunk) => {
        if (chunk) {
            chunks.push(chunk);
            return;
        }
        
        const result = chunks.join('');
        chunks = [];
        
        return result;
    };
}

