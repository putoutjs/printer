'use strict';

module.exports.ForOfStatement = (path, {write, indent, incIndent, traverse}) => {
    if (!isFirst(path)) {
        indent();
        write('\n');
    }
    
    indent();
    write('for (');
    traverse(path.get('left'));
    write(' of ');
    traverse(path.get('right'));
    write(')');
    
    const bodyPath = path.get('body');
    
    if (bodyPath.isExpressionStatement()) {
        incIndent();
        write('\n');
        traverse(bodyPath);
        
        return;
    }
    
    write(' ');
    traverse(bodyPath);
};
function isFirst(path) {
    return path.node === path.parentPath.node.body[0];
}
