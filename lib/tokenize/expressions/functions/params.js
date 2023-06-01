'use strict';

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

function isOneArgArrow(path) {
    if (path.type !== 'ArrowFunctionExpression')
        return false;
    
    const {params} = path.node;
    const [param] = params;
    
    if (params.length !== 1)
        return false;
    
    return param.type === 'Identifier';
}
