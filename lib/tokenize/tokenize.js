import {traverse as babelTraverse} from '@putout/babel';
import * as baseVisitors from './visitors.js';
import {
    maybeFile,
    maybeVisitor,
    maybeThrow,
} from './maybe/index.js';
import {
    parseLeadingComments,
    parseTrailingComments,
} from './comment/comment.js';
import {parseOverrides} from './overrides/overrides.js';
import {createPrinter} from './printer/printer.js';

const isObject = (a) => a && typeof a === 'object';
const isString = (a) => typeof a === 'string';
const {assign} = Object;

const GET = '__';
const get = (path, command) => path.get(command.replace(GET, ''));

export const tokenize = (ast, overrides) => {
    const {
        format,
        semantics,
        visitors,
    } = parseOverrides(overrides);
    
    const {
        mainPrinter,
        debug,
        getTokens,
        maybeLinebreak,
        maybeSpace,
        maybeBreakline,
        maybeNewline,
        indent,
        write,
    } = createPrinter({
        format,
        semantics,
    });
    
    const currentTraversers = {
        ...baseVisitors,
        ...visitors,
    };
    
    const traverse = createTraverse({
        write,
        mainPrinter,
        debug,
        getTokens,
        maybeLinebreak,
        maybeSpace,
        maybeBreakline,
        maybeNewline,
        indent,
        currentTraversers,
        semantics,
    });
    
    if (ast.parentPath)
        pathTraverse(ast, traverse);
    else
        babelTraverse(maybeFile(ast), {
            Program(path) {
                traverse(path);
                path.stop();
            },
        });
    
    return getTokens();
};

const createTraverse = (overrides) => function traverse(path) {
    const {
        write,
        mainPrinter,
        debug,
        maybeLinebreak,
        maybeSpace,
        maybeBreakline,
        maybeNewline,
        indent,
        currentTraversers,
        semantics,
    } = overrides;
    
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
