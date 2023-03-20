'use strict';

const babelTraverse = require('@babel/traverse').default;
const expressions = require('./expressions');
const statements = require('./statements');
const literals = require('./literals');
const {TYPES} = require('../types');
const {createDebug} = require('./debug');
const {
    maybeMarkAfter,
    maybeMarkBefore,
} = require('./mark');
const {parseComments} = require('./comments');

const isString = (a) => typeof a === 'string';

const {assign} = Object;

const traversers = {
    ...expressions,
    ...statements,
    ...literals,
};

const GET = '__';
const get = (path, command) => path.get(command.replace(GET, ''));

module.exports.tokenize = (ast, overrides) => {
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
    const maybeIndentInc = (a) => a && indent.inc();
    const maybeIndentDec = (a) => a && indent.dec();
    const maybeNewline = (a) => a && newline();
    const maybeBreakline = (a) => a && breakline();
    
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
    
    const linebreak = () => {
        tokens.push({
            type: TYPES.NEWLINE,
            value: `${printIndent(i)}\n`,
        });
    };
    
    const breakline = () => {
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
        linebreak,
        breakline,
    });
    
    //const maybePrint = (a, b) => a && print(b);
    
    const maybe = {
        write: maybeWrite,
        indent: maybeIndent,
        markBefore: maybeMarkBefore,
        markAfter: maybeMarkAfter,
        //print: maybePrint,
    };
    
    assign(maybe.indent, {
        inc: maybeIndentInc,
        dec: maybeIndentDec,
    });
    
    //assign(print, write);
    
    const printer = {
        incIndent,
        decIndent,
        indent,
        write,
        maybeWrite,
        debug,
        maybeIndent,
        traverse,
        maybe,
    };
    
    const currentTraversers = {
        ...traversers,
        ...overrides,
    };
    
    babelTraverse(ast, {
        Program(path) {
            traverse(path);
            path.stop();
        },
    });
    
    function traverse(path) {
        const {type} = path;
        const currentTraverse = currentTraversers[type];
        
        if (!path.node)
            return;
        
        const print = createPrint(path, {write, traverse});
        assign(print, write);
        assign(printer, {
            print,
        });
        
        const maybePrint = (a, b) => a && print(b);
        
        assign(maybePrint, {
            newline: maybeNewline,
            breakline: maybeBreakline,
        });
        assign(printer.maybe, {
            print: maybePrint,
        });
        
        if (!currentTraverse)
            throw Error(`Node type '${type}' is not supported yet: '${path}'`);
        
        parseComments(path, printer);
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

/*
const createCompute = (path, {traverse}) => (maybeLine) => {
    if (maybeLine.startsWith(GET))
        return traverse(get(path, maybeLine));
};
*/
const createPrint = (path, {traverse, write}) => (maybeLine) => {
    if (maybeLine === path)
        return null;
    
    if (!isString(maybeLine))
        return traverse(maybeLine);
    
    if (maybeLine.startsWith(GET))
        return traverse(get(path, maybeLine));
    
    return write(maybeLine);
};
