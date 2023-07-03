'use strict';

const {isNext} = require('../../is');
const {markAfter} = require('../../mark');
const {maybeDecorators} = require('../../maybe-get');

module.exports.ClassExpression = classVisitor;

module.exports.StaticBlock = (path, {print, traverse}) => {
    print('static ');
    print('{');
    print.breakline();
    
    for (const child of path.get('body')) {
        traverse(child);
    }
    
    print.indent();
    print('}');
    print.newline();
};

module.exports.ClassDeclaration = (path, {print, indent, maybe, write, traverse}) => {
    indent();
    
    classVisitor(path, {
        print,
        indent,
        maybe,
        traverse,
    });
    
    if (!path.parentPath.isExportDeclaration() && isNext(path)) {
        write.newline();
        maybe.write.newline(path.node.body.body.length);
        markAfter(path);
    }
};

function classVisitor(path, {print, indent, maybe, traverse}) {
    for (const decorator of maybeDecorators(path)) {
        traverse(decorator);
        print.breakline();
    }
    
    print('class ');
    print('__id');
    print('__typeParameters');
    
    const {node} = path;
    
    if (node.implements) {
        print(' implements ');
        path
            .get('implements')
            .forEach(print);
    }
    
    if (node.superClass) {
        maybe.print(path.isStatement(), ' ');
        print('extends ');
        print('__superClass');
    }
    
    print.space();
    print('{');
    maybe.print.newline(path.node.body.body.length);
    indent.inc();
    
    const body = path.get('body.body');
    
    for (const item of body) {
        indent();
        traverse(item);
    }
    
    indent.dec();
    maybe.indent(body.length);
    print('}');
}
