'use strict';

module.exports.condition = (path, printer, semantics) => {
    const {parentPath} = path;
    const {type} = parentPath;
    const {roundBraces} = semantics;
    
    if (type === 'ArrowFunctionExpression')
        return true;
    
    if (type === 'ConditionalExpression' && path !== parentPath.get('test'))
        return true;
    
    if (type === 'LogicalExpression')
        return true;
    
    return roundBraces.sequence;
};
