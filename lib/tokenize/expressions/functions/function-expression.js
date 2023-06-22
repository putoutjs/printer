'use strict';

const {exists} = require('../../is');
const {printParams} = require('./params');

module.exports.FunctionExpression = (path, {print, maybe, write, traverse}) => {
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
    
    printParams(path, {
        print,
        traverse,
    });
    
    print.space();
    print('__body');
};
