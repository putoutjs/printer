'use strict';

module.exports.maybeSpaceAfterKeyword = (path, {print}) => {
    const {argument} = path.node;
    
    if (!argument)
        return;
    
    if (argument.type === 'StringLiteral' || argument.type === 'TemplateLiteral')
        return print.space();
    
    if (argument.type === 'ArrayExpression' || argument.type === 'ObjectExpression')
        return print.space();
    
    print(' ');
};
