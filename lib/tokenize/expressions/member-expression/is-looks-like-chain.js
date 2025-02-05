'use strict';

const {types} = require('@putout/babel');
const {chain} = require('./chain');
const {satisfy} = require('../../is');

const {
    isUnaryExpression,
    isIfStatement,
    isCallExpression,
} = types;

const isArgOfCall = (path) => path.parentPath?.isCallExpression() && path.parentPath.get('arguments.0') === path;
const isCall = (a) => a.type === 'CallExpression';

const isExcludedFromChain = satisfy([isUnaryExpression, isIfStatement]);
const hasComment = ({type}) => type === 'CommentLine';

module.exports.isLooksLikeChain = (path) => {
    const [root, properties] = chain(path);
    
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
