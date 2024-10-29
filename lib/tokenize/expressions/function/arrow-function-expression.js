'use strict';

const {exists} = require('../../is');
const {printParams} = require('./params');
const {maybeParens} = require('../../maybe/maybe-parens');

module.exports.ArrowFunctionExpression = maybeParens((path, printer, semantics) => {
    const {
        print,
        maybe,
        write,
        traverse,
    } = printer;
    
    const {async} = path.node;
    
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
    
    const isJSX = body.isJSXElement();
    
    maybe.print.space(!isJSX);
    
    print('__body');
});
