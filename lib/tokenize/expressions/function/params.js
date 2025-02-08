'use strict';

const {parseComments} = require('../../comment/comment');

const noop = () => {};
const parseParams = (path) => path.get('params');

module.exports.printParams = (path, printer, semantics, customization = {}) => {
    const {extra, typeParameters} = path.node;
    const {
        print,
        maybe,
        traverse,
    } = printer;
    
    const {
        params = parseParams(path),
        braceOpen = '(',
        braceClose = ')',
        printSpace = print.space,
        printBeforeFirst = noop,
        printAfterLast = noop,
    } = customization;
    
    if (typeParameters)
        traverse(path.get('typeParameters'));
    
    printBraceOpen(path, {
        print,
        braceOpen,
    }, semantics);
    
    parseComments(path, printer, semantics);
    printBeforeFirst();
    
    const n = params.length - 1;
    
    for (let i = 0; i <= n; i++) {
        const isLast = i === n;
        const current = params[i];
        
        traverse(current);
        
        if (!isLast) {
            print(',');
            printSpace();
        }
    }
    
    maybe.print(extra?.trailingComma, ',');
    
    printAfterLast();
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
