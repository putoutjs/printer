import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';

const {isBinaryExpression} = types;

export const isConcatenation = createTypeChecker([
    ['-: node.loc', isSameLine],
    ['+', isBinaryExpression],
]);

function isSameLine(loc) {
    const startLine = loc?.start.line;
    const endLine = loc?.end.line;
    
    return startLine === endLine;
}
