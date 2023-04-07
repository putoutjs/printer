'use strict';

const {
    isIfStatement,
    isIdentifier,
    isThisExpression,
} = require('@babel/types');

const {
    compare,
    getTemplateValues,
} = require('@putout/compare');

module.exports.MemberExpression = (path, {print, indent, maybe}) => {
    const {computed} = path.node;
    print('__object');
    
    if (computed) {
        print('[');
        print('__property');
        print(']');
        
        return;
    }
    
    const isChain = looksLikeChain(path);
    maybe.indent.inc(isChain);
    
    if (isChain) {
        print.newline();
        indent(isChain);
    }
    
    print('.');
    print('__property');
    maybe.indent.dec(isChain);
};

module.exports.OptionalMemberExpression = (path, {print}) => {
    const {computed} = path.node;
    print('__object');
    print('?.');
    
    if (computed) {
        print('[');
        print('__property');
        print(']');
        
        return;
    }
    
    print('__property');
};

function looksLikeChain(path) {
    const {parentPath} = path;
    
    if (parentPath.parentPath.isStatement() && !parentPath.parentPath.isExpressionStatement())
        return false;
    
    if (path.find(isIfStatement))
        return false;
    
    const isMember = ({parentPath}) => parentPath.parentPath.isMemberExpression();
    const isExpression = ({parentPath}) => parentPath.parentPath.isExpressionStatement();
    const itMember = isMember(path);
    const itExpression = isExpression(path);
    
    if (parentPath.isLiteral())
        return false;
    
    if (parentPath.isUnaryExpression())
        return false;
    
    if (!itMember && !path.parentPath.isExpressionStatement() && !parentPath.isCallExpression())
        return false;
    
    if (!parentPath.isCallExpression())
        return false;
    
    if (parentPath.get('callee') !== path)
        return false;
    
    if (compare(parentPath, '__a.__b(__args);') && !itMember && !itExpression)
        return false;
    
    if (compare(parentPath, '__a.__b.__c(__args)') && !itMember)
        return false;
    
    if (compare(parentPath, '__a.__b.__c = __d'))
        return false;
    
    if (compare(parentPath, '(__args) => __a.__b(__args).__c()'))
        return false;
    
    if (compare(parentPath, '(__args) => __a.__b(__args).__c'))
        return false;
    
    const {__a, __b} = getTemplateValues(parentPath, '__a.__b(__args)');
    const aType = __a?.type;
    const bType = __b?.type;
    
    if (aType === bType && isIdentifier(__a) && itExpression)
        return false;
    
    if (isThisExpression(__a) && isIdentifier(__b) && itExpression)
        return false;
    
    return !compare(parentPath, '__a.__b(__args)') || itMember || itExpression;
}
