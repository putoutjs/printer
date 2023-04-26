'use strict';

const {
    isIfStatement,
    isIdentifier,
    isThisExpression,
    isUnaryExpression,
} = require('@babel/types');

const {
    compare,
    getTemplateValues,
} = require('@putout/compare');

module.exports.MemberExpression = (path, {print, indent, maybe, traverse}) => {
    const {computed} = path.node;
    const object = path.get('object');
    const isObjectAwait = object.isAwaitExpression();
    
    maybe.print(isObjectAwait, '(');
    traverse(object);
    maybe.print(isObjectAwait, ')');
    
    if (computed) {
        print('[');
        print('__property');
        print(']');
        
        return;
    }
    
    const isChain = isLooksLikeChain(path);
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

function isLooksLikeChain(path) {
    const {parentPath} = path;
    
    if (path.find(isIfStatement))
        return false;
    
    if (compare(parentPath.parentPath.parentPath, '__a.__b(__x).__c(__y)'))
        return true;
    
    if (compare(parentPath, '__a.__b(__x).__c(__y)'))
        return true;
    
    if (path.find(isUnaryExpression))
        return false;
    
    const isMember = ({parentPath}) => parentPath.parentPath.isMemberExpression();
    const isExpression = ({parentPath}) => parentPath.parentPath.isExpressionStatement();
    const itMember = isMember(path);
    const itExpression = isExpression(path);
    const callee = parentPath.get('callee');
    
    if (parentPath.isLiteral())
        return false;
    
    if (!itMember && !path.parentPath.isExpressionStatement() && !parentPath.isCallExpression())
        return false;
    
    if (!parentPath.isCallExpression())
        return false;
    
    if (callee !== path)
        return false;
    
    if (compare(path.parentPath, '__a.__b(__args)[__c]'))
        return false;
    
    if (compare(path.parentPath.parentPath, '__a.__b().__c()'))
        return false;
    
    if (compare(path.parentPath.parentPath, '(__args) => __b.__c(__args).__d()'))
        return false;
    
    if (compare(parentPath, '__a.__b.__c(__args)') && !itMember)
        return false;
    
    if (compare(parentPath, '__a.__b.__c = __d'))
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
    
    return itExpression;
}
