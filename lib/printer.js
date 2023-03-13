'use strict';

const babelTraverse = require('@babel/traverse').default;
const expressions = require('./expressions');
const statements = require('./statements');
const literals = require('./literals');

const traversers = {
    ...expressions,
    ...statements,
    ...literals,
};

module.exports.print = function print(ast) {
    const tokens = [];
    const write = (a) => {
        tokens.push(a);
    };
    
    const indent = () => {
        write(printIndent(i));
    };
    
    let i = 0;
    const incIndent = () => ++i;
    const decIndent = () => ++i;
    
    const printer = {
        incIndent,
        decIndent,
        indent,
        write,
        traverse,
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
        
        if (!currentTraverse)
            throw Error(`Node type '${type}' is not supported yet: '${path}'`);
        
        currentTraverse(path, printer);
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

