import {fullstore} from 'fullstore';
import {createDebug, createLog} from './debug.js';
import {maybeMarkAfter} from '../mark.js';
import {TYPES} from '../../types.js';

const {freeze, assign} = Object;

export const createPrinter = ({format}) => {
    const tokens = [];
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
    
    const getTokens = () => tokens;
    
    return {
        mainPrinter,
        debug,
        getTokens,
        maybeNewline,
        maybeLinebreak,
        maybeSpace,
        maybeBreakline,
        indent,
        write,
    };
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
