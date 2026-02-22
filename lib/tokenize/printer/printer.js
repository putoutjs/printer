import {fullstore} from 'fullstore';
import {createDebug, createLog} from './debug.js';
import {maybeMarkAfter} from '../mark.js';
import {TYPES} from '../../types.js';
import * as baseVisitors from '../visitors.js';
import {maybeVisitor, maybeThrow} from '../maybe/index.js';
import {
    parseLeadingComments,
    parseTrailingComments,
} from '../comment/comment.js';
import {parseOverrides} from '../overrides/overrides.js';

const isObject = (a) => a && typeof a === 'object';
const isString = (a) => typeof a === 'string';

const GET = '__';
const get = (path, command) => path.get(command.replace(GET, ''));

const {freeze, assign} = Object;

export const createPrinter = (overrides) => {
    const tokens = [];
    const {
        format,
        semantics,
        visitors,
    } = parseOverrides(overrides);
    
    const addToken = createAddToken(tokens);
    const debug = createDebug(tokens);
    const write = createWrite(addToken);
    
    const indent = createIndent({
        format,
        addToken,
    });
    
    const newline = createNewline({
        format,
        addToken,
    });
    
    const breakline = createBreakline({
        newline,
        indent,
    });
    
    const linebreak = createLinebreak({
        indent,
        newline,
    });
    
    const space = createSpace({
        format,
        addToken,
    });
    
    const splitter = createSplitter({
        format,
        addToken,
    });
    
    const endOfFile = createEndOfFile({
        format,
        addToken,
    });
    
    const quote = createQuote({
        addToken,
        format,
    });
    
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
    
    const maybeBreakline = createMaybe(breakline);
    const maybeNewline = createMaybe(newline);
    const maybeLinebreak = createMaybe(linebreak);
    const maybeSpace = createMaybe(space);
    
    const maybeWrite = createMaybeWrite({
        write,
    });
    
    assign(maybeWrite, {
        newline: maybeNewline,
        breakline: maybeBreakline,
        linebreak: maybeLinebreak,
        space: maybeSpace,
    });
    
    const maybeIndent = createMaybe(indent);
    
    const maybe = {
        indent: maybeIndent,
        markAfter: maybeMarkAfter,
        write: maybeWrite,
        space: maybeSpace,
    };
    
    const maybeIndentInc = createMaybe(indent.inc);
    const maybeIndentDec = createMaybe(indent.dec);
    
    assign(maybe.indent, {
        inc: maybeIndentInc,
        dec: maybeIndentDec,
    });
    // should never change to avoid unexpected errors related to printing path, since it hard to debug
    const mainPrinter = freeze({
        indent,
        write,
        debug,
        maybe,
        quote,
        store: fullstore(),
    });
    const getMainPrinter = () => mainPrinter;
    
    const traverse = createTraverse({
        maybeNewline,
        maybeLinebreak,
        maybeSpace,
        maybeBreakline,
        indent,
        write,
        debug,
        semantics,
        visitors,
        getMainPrinter,
    });
    
    // should never change to avoid unexpected errors related to printing path, since it hard to debug
    const getTokens = () => tokens;
    
    return {
        getTokens,
        traverse,
    };
};

const createTraverse = (overrides) => function traverse(path) {
    const {
        write,
        debug,
        maybeLinebreak,
        maybeSpace,
        maybeBreakline,
        maybeNewline,
        indent,
        semantics,
        visitors,
        getMainPrinter,
    } = overrides;
    
    const mainPrinter = getMainPrinter();
    
    const currentTraversers = {
        ...baseVisitors,
        ...visitors,
    };
    
    const {type} = path;
    const currentTraverse = currentTraversers[type];
    
    if (!path.node)
        return;
    
    const print = createPrint(path, {
        write,
        traverse,
    });
    
    const printer = {
        ...mainPrinter,
        traverse,
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
    
    const currentIndent = indent.getLevel();
    
    parseLeadingComments(path, printer, semantics, {
        currentTraverse,
    });
    
    // this is main thing
    maybeVisitor(currentTraverse, path, printer, semantics);
    parseTrailingComments(path, printer, semantics, {
        currentTraverse,
    });
    
    maybeThrow(indent.getLevel() !== currentIndent, path, `☝️Looks like indent level changed after token visitor: '{{ type }}', for code: '{{ path }}'`);
    
    debug(path.type);
};

const createPrint = (path, {traverse, write}) => {
    const print = (maybeLine) => {
        if (maybeLine === path)
            return null;
        
        const computed = computePath(path, maybeLine);
        
        if (isObject(computed))
            return traverse(computed);
        
        return write(computed);
    };
    
    assign(print, write);
    
    return print;
};

const computePath = (path, maybeLine) => {
    if (isString(maybeLine) && maybeLine.startsWith(GET))
        return get(path, maybeLine);
    
    if (isObject(maybeLine))
        return maybeLine;
    
    return maybeLine;
};

const createWrite = (addToken) => (value) => {
    addToken({
        type: TYPES.TOKEN,
        value,
    });
};

const createIndent = ({format, addToken}) => {
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
        getLevel() {
            return i;
        },
    });
    
    return indent;
};

const createNewline = ({format, addToken}) => () => {
    addToken({
        type: TYPES.NEWLINE,
        value: format.newline,
    });
};

const createMaybe = (fn) => (a) => a && fn();

const createBreakline = ({newline, indent}) => () => {
    newline();
    indent();
};

const createLinebreak = ({indent, newline}) => () => {
    indent();
    newline();
};

const createMaybeWrite = ({write}) => (a, b) => a && write(b);

const createSpace = ({format, addToken}) => () => {
    addToken({
        type: TYPES.SPACE,
        value: format.space,
    });
};

const createSplitter = ({format, addToken}) => () => {
    addToken({
        type: TYPES.SPLITTER,
        value: format.splitter,
    });
};

const createQuote = ({addToken, format}) => () => {
    addToken({
        type: TYPES.QUOTE,
        value: format.quote,
    });
};

const createEndOfFile = ({format, addToken}) => () => {
    addToken({
        type: TYPES.END_OF_FILE,
        value: format.endOfFile,
    });
};

const createAddToken = (tokens) => {
    const log = createLog();
    
    return (token) => {
        log(token);
        tokens.push(token);
    };
};

function printIndent(i, indent) {
    let result = '';
    ++i;
    
    while (--i > 0) {
        result += indent;
    }
    
    return result;
}

