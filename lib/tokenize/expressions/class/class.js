'use strict';

const {isNext} = require('../../is');
const {markAfter} = require('../../mark');
const {maybeDecorators} = require('../../maybe-get');
const {maybeDeclare} = require('../../maybe/maybe-declare');
const {parseComments} = require('../../comment/comment');

const isInsideExport = ({parentPath}) => parentPath.isExportDeclaration();

module.exports.ClassExpression = classVisitor;

module.exports.ClassDeclaration = {
    print: maybeDeclare((path, printer, semantics) => {
        const {indent} = printer;
        indent();
        classVisitor(path, printer, semantics);
    }),
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

function classVisitor(path, printer, semantics) {
    const {id, abstract} = path.node;
    const {
        print,
        indent,
        maybe,
        traverse,
    } = printer;
    
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
        maybe.print(id && !node.implements, ' ');
        print('extends ');
        print('__superClass');
    }
    
    print.space();
    print('{');
    maybe.print.newline(path.node.body.body.length);
    indent.inc();
    
    const classBody = path.get('body');
    const body = classBody.get('body');
    
    for (const item of body) {
        indent();
        traverse(item);
    }
    
    if (!body.length) {
        parseComments(classBody, printer, semantics);
    }
    
    indent.dec();
    maybe.indent(body.length);
    print('}');
}
