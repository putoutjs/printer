'use strict';

module.exports.UnaryExpression = unaryExpression;
module.exports.UpdateExpression = unaryExpression;

module.exports.AwaitExpression = (path, {print}) => {
    printUnary(path, 'await', {
        print,
    });
};

module.exports.YieldExpression = (path, {print}) => {
    printUnary(path, 'yield', {
        print,
    });
};

module.exports.ThrowStatement = (path, {print, indent}) => {
    indent();
    
    printUnary(path, 'throw', {
        print,
    });
    
    print(';');
    print.newline();
};

function printUnary(path, name, {print}) {
    print(`${name} `);
    print('__argument');
}
const isWord = (a) => /delete|typeof/.test(a);

function unaryExpression(path, {maybe, traverse}) {
    const {
        prefix,
        operator,
    } = path.node;
    
    const argPath = path.get('argument');
    const round = argPath.isBinaryExpression() || argPath.isLogicalExpression();
    
    maybe.print(prefix, operator);
    maybe.print(isWord(operator), ' ');
    
    maybe.print(round, '(');
    traverse(argPath);
    maybe.print(round, ')');
    maybe.print(!prefix, operator);
}
