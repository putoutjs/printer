'use strict';

module.exports.IfStatement = (path, {write, indent, traverse, incIndent, decIndent}) => {
    if (!isFirst(path)) {
        indent();
        write('\n');
    }
    
    indent();
    write('if (');
    traverse(path.get('test'));
    write(')');
    
    const consequent = path.get('consequent');
    
    if (consequent.isBlockStatement()) {
        write(' ');
        traverse(consequent);
        
        return;
    }
    
    write('\n');
    incIndent();
    traverse(consequent);
    decIndent();
    
    const next = path.getNextSibling();
    
    if (!next.node || next.isIfStatement() || next.isExpressionStatement() || next.isReturnStatement())
        return;
    
    indent();
    write('\n');
};

function isFirst(path) {
    return path.node === path.parentPath.node.body[0];
}

