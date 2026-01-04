import {isLast, isNext} from '../../is.js';
import {maybeParens} from '../../maybe/maybe-parens.js';

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

export const AwaitExpression = maybeParens((path, {print}) => {
    printUnary('await', {
        print,
    });
});

export const YieldExpression = maybeParens((path, {print, maybe}) => {
    const {delegate} = path.node;
    
    print(`yield`);
    maybe.print(delegate, '*');
    print(' ');
    print('__argument');
});

export const ThrowStatement = (path, {print, indent, maybe}) => {
    indent();
    
    printUnary('throw', {
        print,
    });
    
    print(';');
    maybe.print.newline(!isLast(path));
    maybe.print.breakline(isNext(path));
};

function printUnary(name, {print}) {
    print(`${name} `);
    print('__argument');
}
