import {types} from '@putout/babel';
import {isLooksLikeChain} from '../../expressions/member-expression/is-looks-like-chain.js';

const {
    isReturnStatement,
    isExpressionStatement,
    isMemberExpression,
    isCallExpression,
} = types;

export const isCallInsideChain = (path) => {
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
