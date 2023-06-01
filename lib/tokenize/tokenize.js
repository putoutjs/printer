'use strict';

const {round} = Math;
const fullstore = require('fullstore');
const isObject = (a) => a && typeof a === 'object';
const babelTraverse = require('@babel/traverse').default;
const expressions = require('./expressions');
const statements = require('./statements');
const literals = require('./literals');
const typescript = require('./typescript');
const jsx = require('./jsx');
const {TYPES} = require('../types');

const {
    maybeFile,
    maybePlugin,
    maybeThrow,
} = require('./maybe');

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
const callWith = (fn, a) => () => fn(a);

const traversers = {
    ...expressions,
    ...statements,
    ...literals,
    ...typescript,
    ...jsx,
};

const GET = '__';
const get = (path, command) => path.get(command.replace(GET, ''));

function initFormat(format) {
    return {
        indent: '    ',
        newline: '\n',
        space: ' ',
        comments: true,
        splitter: '\n',
        roundBraceOpen: '(',
        roundBraceClose: ')',
        ...format,
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
    const maybeWrite = (a, b) => a && write(b);
    const maybeSpace = (a) => a && space();
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
    
    const splitter = () => {
        addToken({
            type: TYPES.SPLITTER,
            value: format.splitter,
        });
    };
    
    const roundBraceOpen = callWith(addToken, {
        type: TYPES.ROUND_BRACE_OPEN,
        value: format.roundBraceOpen,
    });
    
    const roundBraceClose = callWith(addToken, {
        type: TYPES.ROUND_BRACE_Close,
        value: format.roundBraceClose,
    });
    
    const linebreak = () => {
        indent();
        newline();
    };
    
    const space = () => {
        addToken({
            type: TYPES.SPACE,
            value: format.space,
        });
    };
    
    const breakline = () => {
        newline();
        indent();
    };
    
    const newline = () => {
        addToken({
            type: TYPES.NEWLINE,
            value: format.newline,
        });
    };
    
    assign(write, {
        indent,
        newline,
        linebreak,
        breakline,
        space,
        splitter,
    });
    
    assign(maybeWrite, {
        newline: maybeNewline,
        breakline: maybeBreakline,
        linebreak: maybeLinebreak,
        space: maybeSpace,
    });
    
    const maybe = {
        indent: maybeIndent,
        markBefore: maybeMarkBefore,
        markAfter: maybeMarkAfter,
        write: maybeWrite,
        space: maybeSpace,
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
        store: fullstore(),
    };
    
    const currentTraversers = {
        ...traversers,
        ...overrides.visitors,
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
            roundBraceOpen,
            roundBraceClose,
        });
        
        assign(printer, {
            print,
        });
        
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
        
        maybeThrow(!currentTraverse, path, `Node type '{{ type }}' is not supported yet: '{{ path }}'`);
        
        const currentIndent = i;
        parseLeadingComments(path, printer, format);
        // this is main thing
        maybePlugin(currentTraverse, path, printer);
        
        parseTrailingComments(path, printer, format);
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
    if (isString(maybeLine) && maybeLine.startsWith(GET)) {
        return get(path, maybeLine);
    }
    
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
