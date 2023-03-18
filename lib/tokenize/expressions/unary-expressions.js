'use strict';

const {write} = require('fs');

module.exports.UnaryExpression = unaryExpressions;
module.exports.UpdateExpression = unaryExpressions;
module.exports.AwaitExpression = (path, {write, traverse}) => {
    printUnary(path, 'await', {
        write,
        traverse,
    });
};
module.exports.YieldExpression = (path, {write, traverse}) => {
    printUnary(path, 'yield', {
        write,
        traverse,
    });
};

module.exports.ThrowStatement = (path, {write, indent, traverse}) => {
    indent();
    
    printUnary(path, 'throw', {
        write,
        traverse,
    });
    
    write(';');
    write.newline();
};

function printUnary(path, name, {write, traverse}) {
    write(`${name} `);
    traverse(path.get('argument'));
}

const isWord = (a) => /delete|typeof/.test(a);

function unaryExpressions(path, {traverse, write, maybe}) {
    const {prefix, operator} = path.node;
    
    if (prefix)
        write(operator);
    
    maybe.write(isWord(operator), ' ');
    traverse(path.get('argument'));
    
    if (!prefix)
        write(operator);
}

