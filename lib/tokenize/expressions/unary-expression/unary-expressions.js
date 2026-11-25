import {isLast, isNext} from '#is';
import {maybeParens} from '#maybe-parens';
import {printArgument} from '../../comments/comments-printer/argument-comments.js';

const isWord = (a) => /^(delete|typeof|void|throw)$/.test(a);

const unaryExpression = maybeParens((path, printer) => {
    const {maybe, traverse} = printer;
    const {prefix, operator} = path.node;
    const argPath = path.get('argument');
    
    maybe.print(prefix, operator);
    maybe.print(isWord(operator), ' ');
    traverse(argPath);
    maybe.print(!prefix, operator);
});

export const UnaryExpression = unaryExpression;
export const UpdateExpression = unaryExpression;

export const AwaitExpression = maybeParens((path, printer) => {
    printUnary('await', path, printer);
});

export const YieldExpression = maybeParens((path, printer) => {
    const {print, maybe} = printer;
    const {delegate} = path.node;
    
    print(`yield`);
    maybe.print(delegate, '*');
    print(' ');
    printArgument(path, printer);
});

export const ThrowStatement = (path, printer) => {
    const {
        print,
        indent,
        maybe,
    } = printer;
    
    indent();
    printUnary('throw', path, printer);
    
    print(';');
    maybe.print.newline(!isLast(path));
    maybe.print.breakline(isNext(path));
};

function printUnary(name, path, printer) {
    printer.print(`${name} `);
    printArgument(path, printer);
}
