'use strict';

const {parseComments} = require('../../comment/comment');
const {getDirectives} = require('../block-statement/get-directives');

module.exports.Program = (path, printer, semantics) => {
    const {body} = path.node;
    const {
        traverse,
        maybe,
        write,
    } = printer;
    
    traverse(path.get('interpreter'));
    parseComments(path, printer, semantics);
    
    const directives = getDirectives(path);
    
    for (const directive of directives) {
        traverse(directive);
        maybe.write.newline(body.length);
    }
    
    path
        .get('body')
        .forEach(traverse);
    
    if (directives.length && !body.length)
        return;
    
    write.endOfFile();
};
