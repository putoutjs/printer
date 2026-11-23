import {types} from '@putout/babel';
import {isNewlineComment} from '../binary-expression/comments.js';

const {
    isAssignmentExpression,
    isExpressionStatement,
} = types;

export const printSeparator = (path, {print, maybe}) => {
    if (isMultiline(path)) {
        print.breakline();
        return;
    }
    
    maybe.print.space(!isNewlineComment(path.get('right')));
};

function isMultiline(path) {
    const {right} = path.node;
    
    if (!path.parentPath.find(isExpressionStatement))
        return false;
    
    return isAssignmentExpression(right);
}
