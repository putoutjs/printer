import {types} from '@putout/babel';
import {markAfter} from '#mark';
import {maybeDeclare} from '#maybe-declare';
import {createTypeChecker} from '#type-checker';
import {
    hasBody,
    isInsideExportDeclaration,
    isNext,
} from '#is';
import {parseComments} from '#comments';
import {maybeDecorators} from '../../maybe/maybe-decorators.js';

const isFunctionLike = (path) => isFunction(path.parentPath.parentPath);

const afterIf = createTypeChecker([
    ['+', isFunctionLike],
    ['+', isNext],
    ['+: parentPath.parentPath -> TSModuleBlock'],
]);

const {isFunction} = types;
const isLessThenTwo = (a) => a < 2;

const isSpaceBeforeImplements = createTypeChecker([
    ['+: node.typeParameters -> !', Boolean],
    ['+: node.typeParameters.params.length', isLessThenTwo],
]);

const classVisitor = maybeDecorators((path, printer, semantics) => {
    const {node} = path;
    const {
        id,
        abstract,
        superClass,
    } = node;
    
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
    
    if (node.superClass) {
        maybe.print(id, ' ');
        print('extends ');
        print('__superClass');
        print('__superTypeArguments');
    }
    
    if (node.implements) {
        if (isSpaceBeforeImplements(path))
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
    
    if (hasBody(path))
        print.newline();
    
    indent.inc();
    
    const classBody = path.get('body');
    const body = classBody.get('body');
    
    for (const item of body) {
        indent();
        traverse(item);
    }
    
    if (!hasBody(path))
        parseComments(classBody, printer, semantics);
    
    indent.dec();
    
    if (hasBody(path))
        indent();
    
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
    afterIf,
    after(path, {write}) {
        write.newline();
        
        if (!isFunctionLike(path) && hasBody(path)) {
            write.newline();
            markAfter(path);
        }
    },
};
