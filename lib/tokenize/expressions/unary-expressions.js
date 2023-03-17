'use strict';

module.exports.UnaryExpression = unaryExpressions;
module.exports.UpdateExpression = unaryExpressions;

const isWord = (a) => /delete|typeof/.test(a);

function unaryExpressions(path, {traverse, write, maybe}) {
    const {prefix, operator} = path.node;
    
    if (prefix)
        write(operator);
    
    maybe.write(isWord(operator), ' ');
    traverse(path.get('argument'));
    
    if (!prefix)
        write(operator);
}
