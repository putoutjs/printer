import {types} from '@putout/babel';

const {
    isAssignmentExpression,
    isExpressionStatement,
} = types;

export const printSeparator = (path, {print}) => {
    if (isMultiline(path))
        print.breakline();
    else
        print.space();
};

function isMultiline(path) {
    const {right} = path.node;
    
    if (!path.parentPath.find(isExpressionStatement))
        return false;
    
    return isAssignmentExpression(right);
}
