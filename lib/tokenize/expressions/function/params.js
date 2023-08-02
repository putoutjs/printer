'use strict';

const {parseComments} = require('../../comment/comment');

const isBabel7 = (path) => path.node.parameters;

function parseParams(path) {
    if (isBabel7(path))
        return path.get('parameters');
    
    return path.get('params');
}

module.exports.printParams = (path, printer, semantics, customization = {}) => {
    const {
        params = parseParams(path),
        braceOpen = '(',
        braceClose = ')',
    } = customization;
    
    const {print, traverse} = printer;
    
    printBraceOpen(path, {
        print,
        braceOpen,
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
        braceClose,
    });
};

function printBraceOpen(path, {print, braceOpen}) {
    if (isOneArgArrow(path))
        return print.roundBraceOpen();
    
    return print(braceOpen);
}

function printBraceClose(path, {print, braceClose}) {
    if (isOneArgArrow(path))
        return print.roundBraceClose();
    
    print(braceClose);
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
