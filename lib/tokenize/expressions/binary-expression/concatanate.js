'use strict';

const {
    isStringLiteral,
    isTemplateLiteral,
    isBinaryExpression,
} = require('@babel/types');

const isBinary = (a) => isBinaryExpression(a);

const isStringLike = (a) => {
    if (isStringLiteral(a))
        return true;
    
    if (isTemplateLiteral(a))
        return true;
    
    return false;
};

module.exports.isConcatenation = (path) => {
    const {parentPath} = path;
    
    const {
        operator,
        left,
        right,
    } = path.node;
    
    if (operator !== '+')
        return false;
    
    if (isStringLike(left) && isStringLike(right) && isBinary(parentPath))
        return true;
    
    if (isBinary(left) && isStringLike(right))
        return true;
    
    return false;
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
