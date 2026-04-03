import {createTypeChecker} from '#type-checker';

const isPlus = (a) => a === '+';

export const isConcatenation = createTypeChecker([
    ['-: parentPath -> ReturnStatement'],
    ['-: node.operator -> !', isPlus],
    ['-: node.loc', isSameLine],
    ['+: BinaryExpression'],
]);

function isSameLine(loc) {
    const startLine = loc?.start.line;
    const endLine = loc?.end.line;
    
    return startLine === endLine;
}
