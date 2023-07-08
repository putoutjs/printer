'use strict';

const {parseComments} = require('../../comments/comments');
const {getDirectives} = require('../block-statement/get-directives');

module.exports.Program = (path, {print, write, traverse, maybe}, semantics) => {
    const {body} = path.node;
    print('__interpreter');
    parseComments(path, {write}, semantics);
    
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

