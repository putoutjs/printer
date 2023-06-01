'use strict';

const isOneArgArrow = (path) => {
    if (path.type !== 'ArrowFunctionExpression')
        return false;
    
    return path.node.params.length === 1;
};

module.exports.printParams = (path, {print}) => {
    printBraceOpen(path, {
        print,
    });
    
    const params = path.get('params');
    const n = params.length;
    
    for (let i = 0; i < n; i++) {
        print(params[i]);
        
        if (i < n - 1) {
            print(',');
            print.space();
        }
    }
    
    printBraceClose(path, {
        print,
    });
};

function printBraceOpen(path, {print}) {
    if (isOneArgArrow(path))
        return print.roundBraceOpen();
    
    return print('(');
}

function printBraceClose(path, {print}) {
    if (isOneArgArrow(path))
        return print.roundBraceClose();
    
    print(')');
}
