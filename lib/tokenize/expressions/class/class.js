'use strict';

const {types} = require('@putout/babel');

const {isNext} = require('../../is');
const {markAfter} = require('../../mark');

const {maybeDeclare} = require('../../maybe/maybe-declare');
const {parseComments} = require('../../comment/comment');
const {maybeDecorators} = require('../../maybe/maybe-decorators');
const {isFunction} = types;
const isInsideExport = ({parentPath}) => parentPath.isExportDeclaration();
const isFunctionLike = (path) => isFunction(path.parentPath.parentPath);
const hasBody = ({node}) => node.body.body.length;

const classVisitor = maybeDecorators((path, printer, semantics) => {
    const {
        id,
        abstract,
        superClass,
    } = path.node;
    
    const {
        print,
        indent,
        maybe,
        traverse,
    } = printer;
    
    maybe.print(abstract, 'abstract ');
    print('class');
    maybe.print(id || superClass, ' ');
    print('__id');
    print('__typeParameters');
    
    const {node} = path;
    
    if (node.superClass) {
        maybe.print(id, ' ');
        print('extends ');
        print('__superClass');
        print('__superTypeArguments');
    }
    
    if (node.implements) {
        print(' implements ');
        path.get('implements').forEach(print);
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
    
    if (!body.length)
        parseComments(classBody, printer, semantics);
    
    indent.dec();
    maybe.indent(body.length);
    print('}');
});

module.exports.ClassExpression = classVisitor;

module.exports.ClassDeclaration = {
    print: maybeDeclare((path, printer, semantics) => {
        const {indent} = printer;
        indent();
        classVisitor(path, printer, semantics);
    }),
    afterIf(path) {
        if (isFunctionLike(path))
            return true;
        
        if (!isNext(path))
            return false;
        
        return !isInsideExport(path);
    },
    after(path, {write}) {
        write.newline();
        
        if (!isFunctionLike(path) && hasBody(path)) {
            write.newline();
            markAfter(path);
        }
    },
};
