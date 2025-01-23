'use strict';

const {types} = require('@putout/babel');
const {isLooksLikeChain} = require('../../expressions/member-expression/is-looks-like-chain');
const {
    isReturnStatement,
    isExpressionStatement,
    isMemberExpression,
    isCallExpression,
} = types;

module.exports.isCallInsideChain = (path) => {
    if (!isCallExpression(path.parentPath.parentPath))
        return false;
    
    const member = path.find(isTopMemberInsideCall);
    
    if (member)
        return isLooksLikeChain(member);
    
    const callPath = path.find(isTopCall);
    
    if (!callPath)
        return false;
    
    const calleeMember = callPath.get('callee');
    
    return isLooksLikeChain(calleeMember);
};

function isTopMemberInsideCall(path) {
    if (!isMemberExpression(path))
        return false;
    
    return isExpressionStatement(path.parentPath.parentPath);
}

function isTopCall(path) {
    if (!isCallExpression(path))
        return false;
    
    const {parentPath} = path;
    
    if (isReturnStatement(parentPath))
        return true;
    
    return isExpressionStatement(parentPath);
}
