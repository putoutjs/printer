'use strict';

const {isNext} = require('../../is');

module.exports.TSTypeLiteral = (path, {indent, traverse, write, maybe}) => {
    const members = path.get('members');
    write('{');
    
    const is = isNewline(path);
    
    if (is) {
        write.newline();
        indent.inc();
    }
    
    for (const member of members) {
        indent();
        traverse(member);
    }
    
    if (is) {
        indent.dec();
        write.indent();
    }
    
    write('}');
};

function isNewline(path) {
    const members = path.get('members');
    
    return members.length && members[0].node.typeAnnotation;
}
