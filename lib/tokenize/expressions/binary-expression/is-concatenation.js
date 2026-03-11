import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';

const {isBinaryExpression} = types;
const isPlus = (a) => a === '+';

export const isConcatenation = createTypeChecker([
    ['-: node.operator -> !', isPlus],
    ['-: node.loc', isSameLine],
    ['+', isBinaryExpression],
]);

function isSameLine(loc) {
    const startLine = loc?.start.line;
    const endLine = loc?.end.line;
    
    return startLine === endLine;
}
