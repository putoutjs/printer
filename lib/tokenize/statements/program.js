'use strict';

const {parseComments} = require('../comments/comments');

module.exports.Program = (path, {print, write}, semantics) => {
    print('__interpreter');
    parseComments(path, {write}, semantics);
    
    path
        .get('body')
        .forEach(print);
    
    print.newline();
};
