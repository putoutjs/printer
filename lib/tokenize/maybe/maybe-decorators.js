import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {maybeVisitor} from '#printer';
import {hasDecorators, callWithPrev} from '#is';

const {
    isExportDeclaration,
    isClassDeclaration,
} = types;

const isPrevClassProperty = (path) => {
    const prev = path.getPrevSibling();
    
    if (!prev.node)
        return false;
    
    return prev.isClassProperty() || prev.isClassAccessorProperty();
};

const callWithDeclaration = (fn) => (path) => fn(path.get('declaration'));

const isNewline = createTypeChecker([
    ['-: -> !', callWithPrev(isExportDeclaration)],
    ['+', callWithDeclaration(hasDecorators)],
]);

const isExportWithClass = createTypeChecker([
    ['-: -> !ExportNamedDeclaration'],
    ['+', callWithDeclaration(isClassDeclaration)],
]);

export const maybeDecorators = (visitor) => (path, printer, semantics, options) => {
    const {parentPath} = path;
    const {print} = printer;
    
    if (isExportDeclaration(parentPath))
        return maybeVisitor(visitor, path, printer, semantics, options);
    
    if (isExportWithClass(path)) {
        const declaration = path.get('declaration');
        
        if (isNewline(path))
            print.newline();
        
        printDecorators(declaration, printer);
        
        return maybeVisitor(visitor, path, printer, semantics, options);
    }
    
    printDecorators(path, printer);
    maybeVisitor(visitor, path, printer, semantics, options);
};

function printDecorators(path, printer) {
    const {
        maybe,
        traverse,
        write,
    } = printer;
    
    const {decorators} = path.node;
    
    if (!decorators)
        return [];
    
    for (const decorator of path.get('decorators')) {
        maybe.write.breakline(isPrevClassProperty(path));
        traverse(decorator);
        write.breakline();
    }
}
