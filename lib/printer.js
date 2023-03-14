'use strict';

const babelTraverse = require('@babel/traverse').default;
const expressions = require('./expressions');
const statements = require('./statements');
const literals = require('./literals');
const toSnakeCase = require('just-snake-case');

const traversers = {
    ...expressions,
    ...statements,
    ...literals,
};

const {DEBUG} = process.env;

module.exports.print = function print(ast) {
    const tokens = [];
    const write = (a) => {
        tokens.push(a);
    };
    
    const indent = () => {
        write(printIndent(i));
    };
    
    const debug = (a) => maybeWrite(DEBUG, `/*__${toSnakeCase(a)}*/`);
    const maybeWrite = (a, b) => a && write(b);
    const maybeIndent = (a) => a && indent();
    
    let i = 0;
    const incIndent = () => ++i;
    const decIndent = () => --i;
    
    const writeEmptyLine = () => {
        write('\n');
        indent();
    };
    
    const printer = {
        incIndent,
        decIndent,
        indent,
        write,
        maybeWrite,
        debug,
        maybeIndent,
        traverse,
        writeEmptyLine,
    };
    
    babelTraverse(ast, {
        Program(path) {
            traverse(path);
            path.stop();
        },
    });
    
    function traverse(path) {
        const {type} = path;
        const currentTraverse = traversers[type];
        
        if (!path.node)
            return;
        
        if (!currentTraverse)
            throw Error(`Node type '${type}' is not supported yet: '${path}'`);
        
        currentTraverse(path, printer);
        debug(path.type);
    }
    
    return tokens.join('');
};

function printIndent(i) {
    let result = '';
    ++i;
    
    while (--i) {
        result += '    ';
    }
    
    return result;
}

