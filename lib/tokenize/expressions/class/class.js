import {types} from '@putout/babel';
import {markAfter} from '#mark';
import {maybeDeclare} from '#maybe-declare';
import {createTypeChecker} from '#type-checker';
import {
    hasBody,
    isInsideExportDeclaration,
    isInsideTSModuleBlock,
    isNext,
} from '#is';
import {parseComments} from '../../comment/comment.js';
import {maybeDecorators} from '../../maybe/maybe-decorators.js';

const {
    isFunction,
    isExportDeclaration,
} = types;

const isFunctionLike = (path) => isFunction(path.parentPath.parentPath);

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

const beforeIf = createTypeChecker([
    ['+: -> !', isInsideExportDeclaration],
]);

export const ClassDeclaration = {
    beforeIf,
    before: (path, {indent}) => {
        indent();
    },
    print: maybeDeclare((path, printer, semantics) => {
        classVisitor(path, printer, semantics);
    }),
    afterIf(path) {
        const {parentPath} = path;
        
        if (isFunctionLike(path))
            return true;
        
        if (isNext(path))
            return true;
        
        return isInsideTSModuleBlock(parentPath);
    },
    after(path, {write}) {
        write.newline();
        
        if (!isFunctionLike(path) && hasBody(path)) {
            write.newline();
            markAfter(path);
        }
    },
};

