'use strict';

module.exports.ClassExpression = classVisitor;
module.exports.ClassDeclaration = classVisitor;

module.exports.ClassDeclaration = (path, {print, indent}) => {
    indent();
    classVisitor(path, {print, indent});
};

function classVisitor(path, {print, indent}) {
    print('class ');
    print('__id');
    print('__typeParameters');
    
    const {node} = path;
    
    if (node.implements) {
        print(' implements ');
        path.get('implements').forEach(print);
    }
    
    if (node.superClass) {
        print('extends ');
        print('__superClass');
    }
    
    print(' {');
    print.newline();
    indent.inc();
    
    const body = path.get('body.body');
    
    for (const item of body) {
        indent();
        print(item);
    }
    
    indent.dec();
    indent();
    print('}');
}
