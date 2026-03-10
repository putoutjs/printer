import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';

const {isBinaryExpression} = types;

const isSameLine = (loc) => {
    const startLine = loc?.start.line;
    const endLine = loc?.end.line;
    
    return startLine === endLine;
};

export const isConcatenation = createTypeChecker([
    ['-: node.loc', isSameLine],
    ['+', isBinaryExpression],
]);

const isInsideBinary = ({parentPath}) => isBinaryExpression(parentPath);

export const concatenate = (path, {print, indent}) => {
    const insideBinary = isInsideBinary(path);
    
    if (!insideBinary) {
        indent.inc();
        print.breakline();
    }
    
    print('__left');
    print.space();
    print('+');
    print.breakline();
    print('__right');
    
    if (!insideBinary)
        indent.dec();
};
