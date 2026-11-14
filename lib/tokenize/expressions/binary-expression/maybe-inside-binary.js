import {createTypeChecker} from '#type-checker';

const isInsideBinary = createTypeChecker([
    '+: parentPath -> BinaryExpression',
    '+: parentPath -> CallExpression',
]);

export const maybeInsideBinary = (fn) => (path, printer, semantics) => {
    const {indent, print} = printer;
    const insideBinary = isInsideBinary(path);
    
    if (!insideBinary) {
        indent.inc();
        print.breakline();
    }
    
    fn(path, printer, semantics);
    
    if (!insideBinary)
        indent.dec();
};
