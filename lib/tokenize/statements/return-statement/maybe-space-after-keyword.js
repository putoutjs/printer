'use strict';

module.exports.maybeSpaceAfterKeyword = (path, {print}, semantics) => {
    const {roundBraces} = semantics;
    const {argument} = path.node;
    
    if (!argument)
        return;
    
    const {type} = argument;
    
    if (type === 'SequenceExpression' && roundBraces.sequence)
        return print.space();
    
    if (type === 'StringLiteral' || type === 'TemplateLiteral')
        return print.space();
    
    if (type === 'ArrayExpression' || type === 'ObjectExpression')
        return print.space();
    
    if (type === 'UnaryExpression' && argument.operator === '!')
        return print.space();
    
    if (type === 'ArrowFunctionExpression' && roundBraces.arrow)
        return print.space();
    
    print(' ');
};
