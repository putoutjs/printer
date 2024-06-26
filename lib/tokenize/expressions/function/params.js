'use strict';

const {parseComments} = require('../../comment/comment');

function parseParams(path) {
    return path.get('params');
}

module.exports.printParams = (path, printer, semantics, customization = {}) => {
    const {extra, typeParameters} = path.node;
    const {
        params = parseParams(path),
        braceOpen = '(',
        braceClose = ')',
    } = customization;
    
    const {
        print,
        maybe,
        traverse,
    } = printer;
    
    if (typeParameters)
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
    
    maybe.print(extra?.trailingComma, ',');
    
    printBraceClose(path, {
        print,
        braceClose,
    }, semantics);
};

function printBraceOpen(path, {print, braceOpen}, semantics) {
    if (isOneArgArrow(path) && !semantics.roundBraces.arrow)
        return;
    
    return print(braceOpen);
}

function printBraceClose(path, {print, braceClose}, semantics) {
    if (isOneArgArrow(path) && !semantics.roundBraces.arrow)
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
