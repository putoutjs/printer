'use strict';

const {isLast, isNext} = require('../../is');
const {maybeParens} = require('../../maybe/maybe-parens');

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

module.exports.UnaryExpression = unaryExpression;
module.exports.UpdateExpression = unaryExpression;

module.exports.AwaitExpression = maybeParens((path, {print}) => {
    printUnary('await', {
        print,
    });
});

module.exports.YieldExpression = maybeParens((path, {print, maybe}) => {
    const {delegate} = path.node;
    
    print(`yield`);
    maybe.print(delegate, '*');
    print(' ');
    print('__argument');
});

module.exports.ThrowStatement = (path, {print, indent, maybe}) => {
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
