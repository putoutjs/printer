'use strict';

const {entries} = Object;

module.exports.ClassDeclaration = (path, {maybe, print, indent}) => {
    indent();
    print('class ');
    print('__id');
    print('__typeParameters');
    
    const {node} = path;
    
    if (node.implements) {
        print(' implements ');
        path.get('implements').forEach(print);
    }
    
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
