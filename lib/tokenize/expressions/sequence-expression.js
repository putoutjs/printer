'use strict';

module.exports.SequenceExpression = (path, {maybe, print}) => {
    const expressions = path.get('expressions');
    const n = expressions.length - 1;
    const insideArrow = path.parentPath.isArrowFunctionExpression();
    
    maybe.print(insideArrow, '(');
    
    for (const [index, expression] of expressions.entries()) {
        print(expression);
        maybe.print(index < n, ',');
        maybe.print(index < n, ' ');
    }
    
    maybe.print(insideArrow, ')');
};
