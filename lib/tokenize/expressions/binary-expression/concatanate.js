'use strict';

const {
    isStringLiteral,
    isTemplateLiteral,
    isBinaryExpression,
} = require('@babel/types');

const isStringLike = (a) => {
    if (isStringLiteral(a))
        return true;
    
    if (isTemplateLiteral(a))
        return true;
    
    return false;
};

module.exports.isConcatenation = (path) => {
    const {parentPath} = path;
    const {operator} = path.node;
    
    const startLine = path.node.loc?.start.line;
    const endLine = path.node.loc?.end.line;
    
    if (startLine === endLine)
        return false;
    
    const left = path.get('left');
    const right = path.get('right');
    
    if (operator !== '+')
        return false;
    
    if (isStringLike(left) && isStringLike(right) && isBinaryExpression(parentPath))
        return true;
    
    return isBinaryExpression(left) && isStringLike(right);
};

module.exports.concatanate = (path, {print, indent}) => {
    if (!path.parentPath.isBinaryExpression()) {
        indent.inc();
        print.breakline();
    }
    
    print('__left');
    print.space();
    print('+');
    print.breakline();
    print('__right');
    
    if (!path.parentPath.isBinaryExpression()) {
        indent.dec();
    }
};
