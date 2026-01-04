import {types} from '@putout/babel';
import {chain} from './chain.js';
import {satisfy} from '../../is.js';

const {
    isUnaryExpression,
    isIfStatement,
    isCallExpression,
    isIdentifier,
} = types;

const isArgOfCall = (path) => path.parentPath?.isCallExpression() && path.parentPath.get('arguments.0') === path;
const isCall = (a) => a.type === 'CallExpression';

const isExcludedFromChain = satisfy([isUnaryExpression, isIfStatement]);
const hasComment = ({type}) => type === 'CommentLine';

const isInsideMemberCall = (path) => {
    if (!isIdentifier(path.node.object))
        return false;
    
    if (!isIdentifier(path.node.property))
        return false;
    
    if (isLastArgInCall(path))
        return true;
    
    return isCallExpression(path.parentPath.parentPath);
};

function isLastArgInCall(path) {
    const {parentPath} = path;
    
    if (!isCallExpression(parentPath))
        return false;
    
    return path === parentPath.get('arguments').at(-1);
}

export const isLooksLikeChain = (path) => {
    const [root, properties] = chain(path);
    
    if (isInsideMemberCall(path))
        return false;
    
    if (isExcludedFromChain(root))
        return false;
    
    if (isPathGet(properties))
        return false;
    
    if (properties.find(hasComment))
        return true;
    
    if (path.find(isIfUp))
        return false;
    
    const calls = properties.filter(isCall);
    const [firstCall] = calls;
    
    if (calls.length === 2 && !firstCall.name)
        return false;
    
    if (isArgOfCall(path))
        return false;
    
    return calls.length > 1;
};

const isPathGet = ([property]) => {
    return isCallExpression(property, {
        name: 'get',
    });
};

const isIfUp = (path) => {
    const ifPath = path.find(isIfStatement);
    let is = false;
    
    if (!ifPath)
        return is;
    
    ifPath.get('test').traverse({
        MemberExpression(currentPath) {
            if (path === currentPath) {
                is = true;
                path.stop();
            }
        },
    });
    
    return is;
};
