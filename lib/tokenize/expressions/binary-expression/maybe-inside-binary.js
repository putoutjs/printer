import {types} from '@putout/babel';

const {isBinaryExpression} = types;
const isInsideBinary = ({parentPath}) => isBinaryExpression(parentPath);

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

