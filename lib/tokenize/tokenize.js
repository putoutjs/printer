'use strict';

const isObject = (a) => a && typeof a === 'object';

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

function initFormat(format) {
    return {
        ...format,
        indent: '    ',
    };
}

module.exports.tokenize = (ast, overrides = {}) => {
    const format = initFormat(overrides.format);
    const tokens = [];
    const debug = createDebug(tokens);
    const write = (value) => {
        tokens.push({
            type: TYPES.TOKEN,
            value,
        });
    };
    
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
            value: printIndent(i, format.indent),
        });
    };
    
    assign(indent, {
        inc: incIndent,
        dec: decIndent,
    });
    
    const linebreak = () => {
        tokens.push({
            type: TYPES.NEWLINE,
            value: `${printIndent(i, format.indent)}\n`,
        });
    };
    
    const breakline = () => {
        tokens.push({
            type: TYPES.NEWLINE,
            value: `\n${printIndent(i, format.indent)}`,
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
    
    const maybe = {
        indent: maybeIndent,
        markBefore: maybeMarkBefore,
        markAfter: maybeMarkAfter,
    };
    
    assign(maybe.indent, {
        inc: maybeIndentInc,
        dec: maybeIndentDec,
    });
    
    const printer = {
        incIndent,
        decIndent,
        indent,
        write,
        debug,
        maybeIndent,
        traverse,
        maybe,
    };
    
    const currentTraversers = {
        ...traversers,
        ...overrides.visitors,
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

function printIndent(i, indent) {
    let result = '';
    ++i;
    
    while (--i) {
        result += indent;
    }
    
    return result;
}

const createPrint = (path, {traverse, write}) => (maybeLine) => {
    if (maybeLine === path)
        return null;
    
    if (isString(maybeLine) && maybeLine.startsWith(GET))
        return traverse(get(path, maybeLine));
    
    if (isObject(maybeLine))
        return traverse(maybeLine);
    
    return write(maybeLine);
};

