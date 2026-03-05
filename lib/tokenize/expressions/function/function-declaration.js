import {types} from '@putout/babel';
import {printParams} from '#print-params';
import {markAfter} from '#mark';
import {isNext, isNextParent} from '#is';
import {createTypeChecker} from '#type-checker';

const {
    isAssignmentExpression,
    isExportNamedDeclaration,
    isExpressionStatement,
    isFunctionDeclaration,
} = types;

const hasFnBody = ({node}) => node.body.body.length;

const isInsideExportDefaultWithBody = createTypeChecker([
    '-: parentPath -> !ExportDefaultDeclaration',
    ['+', hasFnBody],
]);

const isInsideBlockLike = createTypeChecker(['+: parentPath.parentPath -> TSModuleBlock', '-: parentPath -> !BlockStatement', ['+: -> !', hasFnBody]]);

const not = (fn) => (...a) => !fn(...a);
const notInsideExportDefaultWithBody = not(isInsideExportDefaultWithBody);

const isInsideNamedExport = ({parentPath}) => isExportNamedDeclaration(parentPath);

export const FunctionDeclaration = {
    print(path, printer, semantics) {
        const {print, maybe} = printer;
        
        const {
            async,
            generator,
            returnType,
        } = path.node;
        
        maybe.indent(!isInsideNamedExport(path));
        maybe.print(async, 'async ');
        
        print('function');
        
        if (!generator) {
            print(' ');
        } else {
            print('*');
            print.space();
        }
        
        print('__id');
        printParams(path, printer, semantics);
        
        if (returnType) {
            print(': ');
            print('__returnType');
        }
        
        print.space();
        print('__body');
    },
    afterSatisfy: () => [isNext, isNextParent, isInsideBlockLike],
    after(path, {indent, maybe}) {
        if (isNextAssign(path) || isNextFunction(path) || isNext(path))
            indent();
        
        maybe.write.newline(notInsideExportDefaultWithBody(path));
        markAfter(path);
    },
};

const isNextFunction = (path) => {
    const next = path.getNextSibling();
    return isFunctionDeclaration(next);
};

const isNextAssign = (path) => {
    const next = path.getNextSibling();
    
    if (!isExpressionStatement(next))
        return false;
    
    return isAssignmentExpression(next.node.expression);
};
