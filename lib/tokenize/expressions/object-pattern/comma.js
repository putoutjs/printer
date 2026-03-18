import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';

const {
    isForOfStatement,
    isAssignmentPattern,
} = types;

const isCoupleOption = (a, {couple}) => couple;

export function isInsideForOf({parentPath}) {
    return isForOfStatement(parentPath.parentPath.parentPath);
}

export function isPrevAssign(path) {
    const prev = path.getPrevSibling();
    
    return isAssignmentPattern(prev.node.value);
}

export const isCommaAfterProperty = createTypeChecker([
    ['+', isCoupleOption],
    ['-: key -> -'],
    ['-', isPrevAssign],
    ['-: parentPath', isInsideForOf],
    ['+: node.value.right -> ObjectExpression'],
]);
