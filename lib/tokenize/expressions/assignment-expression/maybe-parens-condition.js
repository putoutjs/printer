'use strict';

const {hasLeadingComment} = require('#is');

const {isParens} = require('../../maybe/maybe-parens');

module.exports.condition = (path, printer, semantics) => {
    const {parentPath} = path;
    const {type} = parentPath;
    const {roundBraces} = semantics;
    
    if (path.node.left.type === 'ObjectPattern')
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
