'use strict';

const {TYPES} = require('../types');
const toSnakeCase = require('just-snake-case');
const {LOG, DEBUG} = process.env;
const {codeFrameColumns} = require('@babel/code-frame');

module.exports.createDebug = (tokens) => (a) => {
    if (!DEBUG)
        return;
    
    tokens.push({
        type: TYPES.DEBUG,
        value: `/*__${toSnakeCase(a)}*/`,
    });
};

module.exports.createLog = ({newline = '\n', store = createStore()} = {}) => (chunk) => {
    if (!LOG)
        return;
    
    if (chunk === newline) {
        console.log(codeFrameColumns(store(), {}, {
            highlightCode: true,
        }));
        return;
    }
    
    store(chunk);
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

