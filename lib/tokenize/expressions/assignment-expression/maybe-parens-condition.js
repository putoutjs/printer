import {hasLeadingComment} from '#is';
import {isParens} from '../../maybe/maybe-parens.js';

export const condition = (path, printer, semantics) => {
    const {parentPath} = path;
    const {type} = parentPath;
    const {roundBraces} = semantics;
    
    if (path.node.left.type === 'ObjectPattern')
        return true;
    
    if (parentPath.type === 'MemberExpression')
        return true;
    
    if (type === 'LogicalExpression')
        return true;
    
    if (type === 'BinaryExpression')
        return true;
    
    if (type === 'UnaryExpression')
        return true;
    
    if (!roundBraces.assign && !hasLeadingComment(path))
        return false;
    
    return isParens(path);
};
