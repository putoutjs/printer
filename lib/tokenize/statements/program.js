'use strict';

const {parseComments} = require('../comments/comments');
const {getDirectives} = require('./block-statement/get-directives');

module.exports.Program = (path, {print, write, traverse, maybe}, semantics) => {
    print('__interpreter');
    parseComments(path, {write}, semantics);
    
    const directives = getDirectives(path);
    
    for (const directive of directives) {
        traverse(directive);
        print.newline();
    }
    
    path
        .get('body')
        .forEach(print);
    
    print.newline();
};

