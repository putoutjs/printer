'use strict';

const {maybeDecorators} = require('../maybe-get');
const {maybeParens} = require('../expressions/function/parens');

module.exports.Identifier = maybeParens((path, printer) => {
    const {
        write,
        maybe,
        traverse,
        print,
    } = printer;
    
    const {node} = path;
    const {name, optional} = node;
    
    const typeAnnotation = path.get('typeAnnotation');
    
    for (const decorator of maybeDecorators(path)) {
        traverse(decorator);
        print(' ');
    }
    
    write(name);
    maybe.write(optional, '?');
    traverse(typeAnnotation);
});
