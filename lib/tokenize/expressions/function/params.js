'use strict';

const {parseComments} = require('../../comment/comment');

function parseParams(path) {
    return path.get('params');
}

module.exports.printParams = (path, printer, semantics, customization = {}) => {
    const {
        params = parseParams(path),
        braceOpen = '(',
        braceClose = ')',
    } = customization;
    
    const {print, traverse} = printer;
    
    if (path.node.typeParameters)
        traverse(path.get('typeParameters'));
    
    printBraceOpen(path, {
        print,
        braceOpen,
    }, semantics);
    
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
    }, semantics);
};

function printBraceOpen(path, {print, braceOpen}, semantics) {
    if (isOneArgArrow(path) && !semantics.roundBraces)
        return;
    
    return print(braceOpen);
}

function printBraceClose(path, {print, braceClose}, semantics) {
    if (isOneArgArrow(path) && !semantics.roundBraces)
        return;
    
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
