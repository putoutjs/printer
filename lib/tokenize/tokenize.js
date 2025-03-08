'use strict';

const fullstore = require('fullstore');

const babelTraverse = require('@putout/babel').traverse;
const {TYPES} = require('../types');
const baseVisitors = require('./visitors');

const {
    maybeFile,
    maybeVisitor,
    maybeThrow,
} = require('./maybe');

const {createDebug, createLog} = require('./debug');
const {maybeMarkAfter} = require('./mark');

const {
    parseLeadingComments,
    parseTrailingComments,
} = require('./comment/comment');

const {parseOverrides} = require('./overrides/overrides');
const isObject = (a) => a && typeof a === 'object';
const {round} = Math;
const isString = (a) => typeof a === 'string';
const {assign, freeze} = Object;

const GET = '__';
const get = (path, command) => path.get(command.replace(GET, ''));

const createAddToken = (tokens) => {
    const log = createLog();
    
    return (token) => {
        log(token);
        tokens.push(token);
    };
};

module.exports.tokenize = (ast, overrides) => {
    const {
        visitors,
        format,
        semantics,
    } = parseOverrides(overrides);
    
    const tokens = [];
    const addToken = createAddToken(tokens);
    const debug = createDebug(tokens);
    
    const write = (value) => {
        addToken({
            type: TYPES.TOKEN,
            value,
        });
    };
    
    const indent = () => {
        addToken({
            type: TYPES.INDENT,
            value: printIndent(i, format.indent),
        });
    };
    
    const maybeIndent = (a) => a && indent();
    
    const maybeIndentInc = (a) => a && indent.inc();
    
    const maybeIndentDec = (a) => a && indent.dec();
    
    const newline = () => {
        addToken({
            type: TYPES.NEWLINE,
            value: format.newline,
        });
    };
    
    const maybeNewline = (a) => a && newline();
    
    const breakline = () => {
        newline();
        indent();
    };
    
    const maybeBreakline = (a) => a && breakline();
    
    const linebreak = () => {
        indent();
        newline();
    };
    
    const maybeLinebreak = (a) => a && linebreak();
    const maybeWrite = (a, b) => a && write(b);
    
    const space = () => {
        addToken({
            type: TYPES.SPACE,
            value: format.space,
        });
    };
    
    const maybeSpace = (a) => a && space();
    let i = 0;
    const incIndent = () => ++i;
    const decIndent = () => --i;
    
    assign(indent, {
        inc: incIndent,
        dec: decIndent,
    });
    
    const splitter = () => {
        addToken({
            type: TYPES.SPLITTER,
            value: format.splitter,
        });
    };
    
    const quote = () => {
        addToken({
            type: TYPES.QUOTE,
            value: format.quote,
        });
    };
    
    const endOfFile = () => {
        addToken({
            type: TYPES.END_OF_FILE,
            value: format.endOfFile,
        });
    };
    
    assign(write, {
        indent,
        newline,
        linebreak,
        breakline,
        space,
        splitter,
        quote,
        endOfFile,
    });
    
    assign(maybeWrite, {
        newline: maybeNewline,
        breakline: maybeBreakline,
        linebreak: maybeLinebreak,
        space: maybeSpace,
    });
    
    const maybe = {
        indent: maybeIndent,
        markAfter: maybeMarkAfter,
        write: maybeWrite,
        space: maybeSpace,
    };
    
    assign(maybe.indent, {
        inc: maybeIndentInc,
        dec: maybeIndentDec,
    });
    
    // should never change to avoid unexpected errors related to printing path, since it hard to debug
    const mainPrinter = freeze({
        indent,
        write,
        debug,
        traverse,
        maybe,
        quote,
        store: fullstore(),
    });
    
    const currentTraversers = {
        ...baseVisitors,
        ...visitors,
    };
    
    if (ast.parentPath)
        pathTraverse(ast, traverse);
    else
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
            round,
        });
        
        const printer = {
            ...mainPrinter,
            print,
        };
        
        const maybePrint = (a, b) => a && print(b);
        
        assign(maybePrint, {
            newline: maybeNewline,
            breakline: maybeBreakline,
            linebreak: maybeLinebreak,
            space: maybeSpace,
        });
        
        assign(printer.maybe, {
            print: maybePrint,
        });
        
        maybeThrow(!currentTraverse, path, `☝️ Node type '{{ type }}' is not supported yet by @putout/printer: '{{ path }}'`);
        
        const currentIndent = i;
        parseLeadingComments(path, printer, semantics, {
            currentTraverse,
        });
        
        // this is main thing
        maybeVisitor(currentTraverse, path, printer, semantics);
        parseTrailingComments(path, printer, semantics);
        maybeThrow(i !== currentIndent, path, `☝️Looks like indent level changed after token visitor: '{{ type }}', for code: '{{ path }}'`);
        
        debug(path.type);
    }
    
    return tokens;
};

function printIndent(i, indent) {
    let result = '';
    ++i;
    
    while (--i > 0) {
        result += indent;
    }
    
    return result;
}

const createPrint = (path, {traverse, write}) => (maybeLine) => {
    if (maybeLine === path)
        return null;
    
    const computed = computePath(path, maybeLine);
    
    if (isObject(computed))
        return traverse(computed);
    
    return write(computed);
};

const computePath = (path, maybeLine) => {
    if (isString(maybeLine) && maybeLine.startsWith(GET))
        return get(path, maybeLine);
    
    if (isObject(maybeLine))
        return maybeLine;
    
    return maybeLine;
};

function pathTraverse(ast, traverse) {
    ast.parentPath.traverse({
        enter(path) {
            if (path === ast) {
                traverse(path);
                path.stop();
            }
        },
    });
}
