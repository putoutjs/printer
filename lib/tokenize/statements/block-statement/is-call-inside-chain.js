import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {isLooksLikeChain} from '../../expressions/member-expression/is-looks-like-chain.js';

const {isCallExpression} = types;

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

const isTopMemberInsideCall = createTypeChecker([
    '-: -> !MemberExpression',
    '+: parentPath.parentPath -> ExpressionStatement',
]);

const isTopCall = createTypeChecker([
    '-: -> !CallExpression',
    '+: parentPath -> ReturnStatement',
    '+: parentPath -> ExpressionStatement',
]);
