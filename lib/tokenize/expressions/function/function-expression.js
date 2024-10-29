'use strict';

const {exists} = require('../../is');
const {printParams} = require('./params');
const {maybeParens} = require('../../maybe/maybe-parens');

module.exports.FunctionExpression = maybeParens((path, printer, semantics) => {
    const {
        print,
        maybe,
        write,
        traverse,
    } = printer;
    
    const {node} = path;
    const {generator, async} = node;
    
    maybe.write(async, 'async ');
    write('function');
    maybe.write(generator, '*');
    
    const id = path.get('id');
    
    if (exists(id)) {
        write(' ');
        traverse(id);
    }
    
    printParams(path, printer, semantics);
    
    print.space();
    print('__body');
});
