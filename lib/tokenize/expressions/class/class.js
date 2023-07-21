'use strict';

const {isNext} = require('../../is');
const {markAfter} = require('../../mark');
const {maybeDecorators} = require('../../maybe-get');

const isInsideExport = ({parentPath}) => parentPath.isExportDeclaration();

module.exports.ClassExpression = classVisitor;

module.exports.ClassDeclaration = {
    print(path, {print, indent, maybe, traverse}) {
        indent();
        
        classVisitor(path, {
            print,
            indent,
            maybe,
            traverse,
        });
    },
    afterIf(path) {
        if (!isNext(path))
            return false;
        
        return !isInsideExport(path);
    },
    after(path, {write}) {
        write.newline();
        
        if (path.node.body.body.length) {
            write.newline();
            markAfter(path);
        }
    },
};

function classVisitor(path, {print, indent, maybe, traverse}) {
    const {abstract} = path.node;
    
    for (const decorator of maybeDecorators(path)) {
        traverse(decorator);
        print.breakline();
    }
    
    maybe.print(abstract, 'abstract ');
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
