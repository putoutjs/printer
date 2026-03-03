import {types} from '@putout/babel';
import {isNext, isNextParent} from '#is';
import {printParams} from '#print-params';
import {markAfter} from '#mark';

const not = (fn) => (...a) => !fn(...a);
const notInsideExportDefaultWithBody = not(isInsideExportDefaultWithBody);

const {
    isAssignmentExpression,
    isTSModuleBlock,
    isBlockStatement,
    isExportNamedDeclaration,
    isExpressionStatement,
    isFunctionDeclaration,
    isExportDefaultDeclaration,
} = types;

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

function isInsideBlockLike(path) {
    const {parentPath} = path;
    
    if (isTSModuleBlock(parentPath.parentPath))
        return true;
    
    if (!isBlockStatement(parentPath))
        return false;
    
    return !path.node.body.body.length;
}

function isInsideExportDefaultWithBody(path) {
    if (!isExportDefaultDeclaration(path.parentPath))
        return false;
    
    return path.node.body.body.length;
}
