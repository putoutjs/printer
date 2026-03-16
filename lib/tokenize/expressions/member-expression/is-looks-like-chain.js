import {types} from '@putout/babel';
import {satisfy} from '#is';
import {createTypeChecker} from '#type-checker';
import {chain} from './chain.js';

const {
    isUnaryExpression,
    isIfStatement,
    isCallExpression,
    isIdentifier,
} = types;

const isPathFirstArg = ({node, parentPath}) => {
    const [first] = parentPath.node.arguments;
    return node === first;
};

function isPathLastArg({node, parentPath}) {
    const last = parentPath.node.arguments.at(-1);
    return node === last;
}

const isFirstArgOfCall = createTypeChecker([
    ['-: parentPath -> !CallExpression'],
    ['+', isPathFirstArg],
]);

const isLastArgInCall = createTypeChecker([
    ['-: parentPath -> !CallExpression'],
    ['+', isPathLastArg],
]);

const isCall = (a) => a.type === 'CallExpression';

const isExcludedFromChain = satisfy([
    isUnaryExpression,
    isIfStatement,
]);

const hasComment = ({type}) => type === 'CommentLine';

const isInsideMemberCall = (path) => {
    if (!isIdentifier(path.node.object))
        return false;
    
    if (!isIdentifier(path.node.property))
        return false;
    
    debugger;
    
    if (isLastArgInCall(path))
        return true;
    
    return isCallExpression(path.parentPath.parentPath);
};

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
    
    debugger;
    
    if (isFirstArgOfCall(path))
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

