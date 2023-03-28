'use strict';

const isObject = (a) => a && typeof a === 'object';
const babelTraverse = require('@babel/traverse').default;
const expressions = require('./expressions');
const statements = require('./statements');
const literals = require('./literals');
const {TYPES} = require('../types');
const {maybeFile} = require('./maybe');

const {
    createDebug,
    createLog,
} = require('./debug');

const {
    maybeMarkAfter,
    maybeMarkBefore,
} = require('./mark');

const {
    parseLeadingComments,
    parseTrailingComments,
} = require('./comments');

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
const createAddToken = (tokens) => {
    const log = createLog();
    
    return (token) => {
        log(token);
        tokens.push(token);
    };
};

module.exports.tokenize = (ast, overrides = {}) => {
    const format = initFormat(overrides.format);
    const tokens = [];
    const addToken = createAddToken(tokens);
    const debug = createDebug(tokens);
    
    const write = (value) => {
        addToken({
            type: TYPES.TOKEN,
            value,
        });
    };
    
    const maybeIndent = (a) => a && indent();
    const maybeIndentInc = (a) => a && indent.inc();
    const maybeIndentDec = (a) => a && indent.dec();
    const maybeNewline = (a) => a && newline();
    const maybeBreakline = (a) => a && breakline();
    const maybeLinebreak = (a) => a && linebreak();
    let i = 0;
    const incIndent = () => ++i;
    const decIndent = () => --i;
    
    const indent = () => {
        addToken({
            type: TYPES.INDENT,
            value: printIndent(i, format.indent),
        });
    };
    
    assign(indent, {
        inc: incIndent,
        dec: decIndent,
    });
    
    const linebreak = () => {
        addToken({
            type: TYPES.NEWLINE,
            value: `${printIndent(i, format.indent)}\n`,
        });
    };
    
    const space = () => {
        addToken({
            type: TYPES.SPACE,
            value: ' ',
        });
    };
    
    const breakline = () => {
        addToken({
            type: TYPES.NEWLINE,
            value: `\n${printIndent(i, format.indent)}`,
        });
    };
    
    const newline = () => {
        addToken({
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
        indent,
        write,
        debug,
        traverse,
        maybe,
    };
    
    const currentTraversers = {
        ...traversers,
        ...overrides.visitors,
    };
    
    babelTraverse(maybeFile(ast), {
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
        
        const print = createPrint(path, {
            write,
            traverse,
        });
        
        assign(print, write, {
            space,
        });
        
        assign(printer, {
            print,
        });
        
        const maybePrint = (a, b) => a && print(b);
        
        assign(maybePrint, {
            newline: maybeNewline,
            breakline: maybeBreakline,
            linebreak: maybeLinebreak,
        });
        
        assign(printer.maybe, {
            print: maybePrint,
        });
        
        if (!currentTraverse)
            throw Error(`Node type '${type}' is not supported yet: '${path}'`);
        
        parseLeadingComments(path, printer);
        currentTraverse(path, printer);
        parseTrailingComments(path, printer);
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
        return traverse(get(
            path,
            maybeLine,
        ));
    
    if (isObject(maybeLine))
        return traverse(maybeLine);
    
    return write(maybeLine);
};
