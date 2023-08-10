'use strict';

const {exists} = require('../../is');
const {printParams} = require('./params');
const {maybeParens} = require('./parens');

module.exports.ArrowFunctionExpression = maybeParens((path, printer, semantics) => {
    const {
        print,
        maybe,
        write,
        traverse,
    } = printer;
    
    const {async} = path.node;
    
    print('__typeParameters');
    maybe.print(async, 'async ');
    
    printParams(path, printer, semantics);
    
    const returnType = path.get('returnType');
    
    if (exists(returnType)) {
        write(':');
        write.space();
        traverse(returnType);
    }
    
    print.space();
    print('=>');
    
    const body = path.get('body');
    
    const insideCall = path.parentPath.isCallExpression();
    const isJSX = body.isJSXElement();
    
    maybe.print.space(!insideCall && isJSX);
    maybe.print.space(!isJSX);
    print('__body');
});
