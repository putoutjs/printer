'use strict';

const {entries} = Object;

const isFirst = (path) => path.node === path.parentPath.node.body[0];

module.exports.ClassDeclaration = (path, {write, maybeWrite, writeEmptyLine, indent, incIndent, decIndent, traverse}) => {
    if (!isFirst(path)) {
        writeEmptyLine();
    }
    
    indent();
    write('class ');
    traverse(path.get('id'));
    write(' {\n');
    incIndent();
    
    const body = path.get('body.body');
    const n = body.length - 1;
    
    for (const [i, item] of entries(body)) {
        indent();
        traverse(item);
        maybeWrite(i < n, '\n');
    }
    
    decIndent();
    write('}');
};

