'use strict';

const {maybeDecorators} = require('../maybe-get');
const {maybeParens} = require('../maybe/maybe-parens');
const {maybeTypeAnnotation} = require('../maybe/maybe-type-annotation');

module.exports.Identifier = maybeParens(maybeTypeAnnotation((path, printer) => {
    const {
        write,
        maybe,
        traverse,
        print,
    } = printer;
    
    const {node} = path;
    const {name, optional} = node;
    
    for (const decorator of maybeDecorators(path)) {
        traverse(decorator);
        print(' ');
    }
    
    write(name);
    maybe.write(optional, '?');
}));
