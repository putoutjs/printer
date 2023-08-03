'use strict';

const {isLast, isNext} = require('../../is');
const {
    maybeParenOpen,
    maybeParenClose,
} = require('./parens');

module.exports.UnaryExpression = unaryExpression;
module.exports.UpdateExpression = unaryExpression;

module.exports.AwaitExpression = (path, {print}) => {
    printUnary(path, 'await', {
        print,
    });
};

module.exports.YieldExpression = (path, {print, maybe}) => {
    const {delegate} = path.node;
    
    print(`yield`);
    maybe.print(delegate, '*');
    print(' ');
    print('__argument');
};

module.exports.ThrowStatement = (path, {print, indent, maybe}) => {
    indent();
    
    printUnary(path, 'throw', {
        print,
    });
    
    print(';');
    maybe.print.newline(!isLast(path));
    maybe.print.breakline(isNext(path));
};

function printUnary(path, name, {print}) {
    print(`${name} `);
    print('__argument');
}

const isWord = (a) => /^(delete|typeof|void|throw)$/.test(a);

function unaryExpression(path, printer) {
    const {maybe, traverse} = printer;
    const {prefix, operator} = path.node;
    const argPath = path.get('argument');
    
    maybeParenOpen(path, printer);
    
    maybe.print(prefix, operator);
    maybe.print(isWord(operator), ' ');
    traverse(argPath);
    maybe.print(!prefix, operator);
    
    maybeParenClose(path, printer);
}
