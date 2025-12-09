'use strict';

module.exports.TSTypeLiteral = (path, {indent, traverse, write}) => {
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
    const {parentPath} = path;
    
    const {length} = path.get('members');
    
    if (!length)
        return false;
    
    if (length > 1)
        return true;
    
    return !parentPath.isTSTypeParameterInstantiation();
}
