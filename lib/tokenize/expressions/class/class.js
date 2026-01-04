import {types} from '@putout/babel';
import {isNext} from '../../is.js';
import {markAfter} from '../../mark.js';
import {maybeDeclare} from '../../maybe/maybe-declare.js';
import {parseComments} from '../../comment/comment.js';
import {maybeDecorators} from '../../maybe/maybe-decorators.js';

const isInsideTSModuleBlock = (path) => {
    return isTSModuleBlock(path.parentPath.parentPath);
};

const {
    isFunction,
    isTSModuleBlock,
} = types;

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
        const {typeParameters} = node;
        
        if (!typeParameters || typeParameters.params.length < 2)
            print(' ');
        
        print('implements ');
        
        const implementsPaths = path.get('implements');
        const n = implementsPaths.length - 1;
        
        for (const [i, implement] of implementsPaths.entries()) {
            print(implement);
            maybe.print(i < n, ', ');
        }
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

export const ClassExpression = classVisitor;

export const ClassDeclaration = {
    print: maybeDeclare((path, printer, semantics) => {
        const {maybe} = printer;
        maybe.indent(!isInsideExport(path));
        classVisitor(path, printer, semantics);
    }),
    afterIf(path) {
        if (isFunctionLike(path))
            return true;
        
        if (isNext(path))
            return true;
        
        return isInsideTSModuleBlock(path);
    },
    after(path, {write}) {
        write.newline();
        
        if (!isFunctionLike(path) && hasBody(path)) {
            write.newline();
            markAfter(path);
        }
    },
};
