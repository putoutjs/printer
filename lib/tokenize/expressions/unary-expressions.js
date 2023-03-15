'use strict';

module.exports.UnaryExpression = unaryExpressions;
module.exports.UpdateExpression = unaryExpressions;

function unaryExpressions(path, {traverse, write}) {
    const {prefix, operator} = path.node;
    
    if (prefix)
        write(operator);
    
    traverse(path.get('argument'));
    
    if (!prefix)
        write(operator);
}
