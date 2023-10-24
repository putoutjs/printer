'use strict';

const {parseComments} = require('../../comment/comment');
const {getDirectives} = require('../block-statement/get-directives');

module.exports.Program = (path, printer, semantics) => {
    const {body} = path.node;
    const {
        print,
        traverse,
        maybe,
    } = printer;
    
    print('__interpreter');
    parseComments(path, printer, semantics);
    
    const directives = getDirectives(path);
    
    for (const directive of directives) {
        traverse(directive);
        maybe.print.newline(body.length);
    }
    
    path
        .get('body')
        .forEach(print);
    
    if (directives.length && !body.length)
        return;
    
    print.newline();
};
