'use strict';

const {parseComments} = require('../../comment/comment');

module.exports.printParams = (path, printer, semantics, customization = {}) => {
    const {
        params = path.get('params'),
    } = customization;
    
    const {print, traverse} = printer;
    
    printBraceOpen(path, {
        print,
    });
    
    parseComments(path, printer, semantics);
    
    const n = params.length - 1;
    
    for (let i = 0; i <= n; i++) {
        const isLast = i === n;
        
        traverse(params[i]);
        
        if (!isLast) {
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
