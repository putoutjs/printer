'use strict';

const {entries} = Object;

const isFirst = (path) => path.node === path.parentPath.node.body[0];

module.exports.ClassDeclaration = (path, {maybe, print, indent}) => {
    if (!isFirst(path)) {
        print.linebreak();
    }
    
    indent();
    print('class ');
    print(path.get('id'));
    print(' {\n');
    indent.inc();
    
    const body = path.get('body.body');
    const n = body.length - 1;
    
    for (const [i, item] of entries(body)) {
        indent();
        print(item);
        maybe.print(i < n, '\n');
    }
    
    indent.dec();
    print('}');
};

