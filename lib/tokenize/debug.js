import process from 'node:process';
import toSnakeCase from 'just-snake-case';
import {codeFrameColumns} from '@putout/babel';
import {TYPES} from '../types.js';

const {stringify} = JSON;
const {
    LOG,
    LOG_ALL,
    LOG_TOKENS,
    LOG_TERM,
    LOG_DEBUG,
} = process.env;

export const createDebug = (tokens) => (a) => {
    if (!LOG_DEBUG)
        return;
    
    tokens.push({
        type: TYPES.DEBUG,
        value: `/*__${toSnakeCase(a)}*/`,
    });
};

export const createLog = ({newline = '\n', store = createStore()} = {}) => ({type, value}) => {
    if (LOG_TOKENS) {
        console.log(codeFrameColumns(stringify({
            type,
            value,
        }), {}, {
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
    
    if (LOG_TERM)
        process.stdout.write(value);
};

function createStore() {
    let chunks = [];
    
    return (...args) => {
        const [chunk] = args;
        
        if (args.length) {
            chunks.push(chunk);
            return;
        }
        
        const result = chunks.join('');
        
        chunks = [];
        
        return result;
    };
}
