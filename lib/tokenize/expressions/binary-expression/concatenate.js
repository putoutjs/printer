'use strict';

const {types} = require('@putout/babel');
const {
    isStringLiteral,
    isTemplateLiteral,
    isBinaryExpression,
} = types;

const isStringLike = (a) => {
    if (isStringLiteral(a))
        return true;
    
    return isTemplateLiteral(a);
};

module.exports.isConcatenation = (path) => {
    const {parentPath} = path;
    const {operator} = path.node;
    
    if (operator !== '+')
        return false;
    
    const startLine = path.node.loc?.start.line;
    const endLine = path.node.loc?.end.line;
    
    if (startLine === endLine)
        return false;
    
    const left = path.get('left');
    const right = path.get('right');
    
    if (isStringLike(left) && isStringLike(right) && isBinaryExpression(parentPath))
        return true;
    
    return isBinaryExpression(left) && isStringLike(right);
};

module.exports.concatenate = (path, {print, indent}) => {
    if (!path.parentPath.isBinaryExpression()) {
        indent.inc();
        print.breakline();
    }
    
    print('__left');
    print.space();
    print('+');
    print.breakline();
    print('__right');
    
    if (!path.parentPath.isBinaryExpression())
        indent.dec();
};
