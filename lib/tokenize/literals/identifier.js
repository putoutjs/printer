'use strict';

const {
    maybeParenOpen,
    maybeParenClose,
} = require('../expressions/unary-expression/parens');

const {maybeDecorators} = require('../maybe-get');

module.exports.Identifier = (path, printer) => {
    const {
        write,
        maybe,
        traverse,
        print,
    } = printer;
    
    const {node} = path;
    const {name, optional} = node;
    
    const typeAnnotation = path.get('typeAnnotation');
    
    maybeParenOpen(path, printer);
    
    for (const decorator of maybeDecorators(path)) {
        traverse(decorator);
        print(' ');
    }
    
    write(name);
    maybe.write(optional, '?');
    traverse(typeAnnotation);
    
    maybeParenClose(path, printer);
};
