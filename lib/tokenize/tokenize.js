'use strict';

const babelTraverse = require('@babel/traverse').default;
const expressions = require('./expressions');
const statements = require('./statements');
const literals = require('./literals');
const {TYPES} = require('../types');
const {createDebug} = require('./debug');
const {maybeMark} = require('./mark');

const {assign} = Object;

const traversers = {
    ...expressions,
    ...statements,
    ...literals,
};

module.exports.tokenize = (ast) => {
    const tokens = [];
    const debug = createDebug(tokens);
    const write = (value) => {
        tokens.push({
            type: TYPES.TOKEN,
            value,
        });
    };
    
    const maybeWrite = (a, b) => a && write(b);
    const maybeIndent = (a) => a && indent();
    
    let i = 0;
    const incIndent = () => ++i;
    const decIndent = () => --i;
    
    const indent = () => {
        tokens.push({
            type: TYPES.INDENT,
            value: printIndent(i),
        });
    };
    
    assign(indent, {
        inc: incIndent,
        dec: decIndent,
    });
    
    const writeEmptyLine = () => {
        tokens.push({
            type: TYPES.NEWLINE,
            value: `\n${printIndent(i)}`,
        });
    };
    
    const newline = () => {
        tokens.push({
            type: TYPES.NEWLINE,
            value: '\n',
        });
    };
    
    assign(write, {
        indent,
        newline,
        linebreak: writeEmptyLine,
    });
    
    const maybe = {
        write: maybeWrite,
        indent: maybeIndent,
        mark: maybeMark,
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
        maybe,
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
    
    return tokens;
};

function printIndent(i) {
    let result = '';
    ++i;
    
    while (--i) {
        result += '    ';
    }
    
    return result;
}

