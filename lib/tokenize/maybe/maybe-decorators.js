import {types} from '@putout/babel';
import {maybeVisitor} from '#printer';

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

export const maybeDecorators = (visitor) => (path, printer, semantics, options) => {
    if (isExportDeclaration(path.parentPath))
        return maybeVisitor(visitor, path, printer, semantics, options);
    
    if (isExportDeclaration(path) && isClassDeclaration(path.node.declaration)) {
        const declaration = path.get('declaration');
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
