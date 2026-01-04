import {types} from '@putout/babel';

const {
    isMemberExpression,
    isSequenceExpression,
} = types;

export const maybeTypeAnnotation = (visit) => (path, printer, semantics) => {
    visit(path, printer, semantics);
    
    maybePrintTypeAnnotation(path, printer);
};

export function maybePrintTypeAnnotation(path, printer) {
    const {parentPath, node} = path;
    
    const {typeAnnotation} = node;
    const {write, traverse} = printer;
    
    if (isSequenceExpression(parentPath))
        return;
    
    if (isMemberExpression(parentPath))
        return;
    
    if (typeAnnotation) {
        write(':');
        write.space();
        traverse(path.get('typeAnnotation'));
    }
}
