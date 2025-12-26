'use strict';

module.exports.maybeSpaceAfterKeyword = (path, {print}, semantics) => {
    const {roundBraces} = semantics;
    const {node} = path;
    
    if (!node)
        return;
    
    const {type} = node;
    
    if (type === 'SequenceExpression' && roundBraces.sequence)
        return print.space();
    
    if (type === 'StringLiteral' || type === 'TemplateLiteral')
        return print.space();
    
    if (type === 'ArrayExpression' || type === 'ObjectExpression')
        return print.space();
    
    if (type === 'UnaryExpression' && node.operator === '!')
        return print.space();
    
    if (type === 'ArrowFunctionExpression' && roundBraces.arrow)
        return print.space();
    
    print(' ');
};
