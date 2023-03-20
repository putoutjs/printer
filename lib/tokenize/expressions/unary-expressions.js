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

function unaryExpression(path, {print, maybe}) {
    const {prefix, operator} = path.node;
    
    if (prefix)
        print(operator);
    
    maybe.print(isWord(operator), ' ');
    print('__argument');
    
    if (!prefix)
        print(operator);
}

