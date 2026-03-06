import {types} from '@putout/babel';
import {printParams} from '#print-params';
import {markAfter} from '#mark';
import {
    getNext,
    isNext,
    isNextParent,
} from '#is';
import {createTypeChecker} from '#type-checker';

const {
    isExportNamedDeclaration,
    isExpressionStatement,
    isFunctionDeclaration,
} = types;

const hasFnBody = ({node}) => node.body.body.length;

const isIndentAfter = createTypeChecker([
    ['+', getNext(isFunctionDeclaration)],
    ['+', isNext],
    ['-: -> !', getNext(isExpressionStatement)],
]);

const isNotInsideExportDefaultWithBody = createTypeChecker([
    '+: parentPath -> !ExportDefaultDeclaration',
    ['+: -> !', hasFnBody],
]);

const isInsideBlockLike = createTypeChecker([
    '+: parentPath.parentPath -> TSModuleBlock',
    '-: parentPath -> !BlockStatement',
    ['+: -> !', hasFnBody],
]);

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
        if (isIndentAfter(path))
            indent();
        
        maybe.write.newline(isNotInsideExportDefaultWithBody(path));
        markAfter(path);
    },
};
