'use strict';

module.exports.TSTypeLiteral = (path, {indent, traverse, write, maybe}) => {
    const members = path.get('members');
    write('{');
    
    const is = isNewline(path, {members});
    
    if (is) {
        write.newline();
        indent.inc();
    }
    
    for (const member of members) {
        indent();
        traverse(member);
        maybe.write(is, ';');
    }
    
    if (is) {
        write.newline();
        indent.inc();
    }
    
    write('}');
};

function isNewline(path) {
    const members = path.get('members');
    
    if (members.length && members[0].node.typeAnnotation)
        return true;
    
    return false;
}
