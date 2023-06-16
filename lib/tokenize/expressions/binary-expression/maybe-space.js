'use strict';

module.exports.maybeSpace = (path, {print}) => {
    const {right} = path.node;
    
    if (right.type === 'UnaryExpression' && right.operator === '+')
        return print(' ');
    
    return print.space();
};
