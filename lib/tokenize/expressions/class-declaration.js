'use strict';

module.exports.ClassDeclaration = (path, {print, indent}) => {
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
    
    for (const item of body) {
        indent();
        print(item);
    }
    
    indent.dec();
    print('}');
};
