'use strict';

const {
    isUnaryExpression,
    isArrowFunctionExpression,
    isIfStatement,
} = require('@putout/babel').types;

const {chain} = require('./chain');
const {satisfy} = require('../../is');

const isArgOfCall = (path) => path.parentPath.isCallExpression() && path.parentPath.get('arguments.0') === path;

module.exports.MemberExpression = (path, {print, maybe, traverse}) => {
    const object = path.get('object');
    const isParens = object.isAwaitExpression() || object.isAssignmentExpression();
    const {computed} = path.node;
    
    maybe.print(isParens, '(');
    traverse(object);
    maybe.print(isParens, ')');
    
    if (computed) {
        print('[');
        print('__property');
        print(']');
        
        return;
    }
    
    const isChain = likeChain(path);
    
    maybe.indent.inc(isChain);
    
    if (isChain)
        print.breakline();
    
    print('.');
    print('__property');
    maybe.indent.dec(isChain);
};

module.exports.OptionalMemberExpression = (path, {print, maybe}) => {
    const {computed, optional} = path.node;
    
    print('__object');
    
    maybe.print(optional, '?.');
    maybe.print(!optional && !computed, '.');
    
    if (computed) {
        print('[');
        print('__property');
        print(']');
        
        return;
    }
    
    print('__property');
};

const isCall = (a) => a.type === 'CallExpression';

const isExcludedFromChain = satisfy([
    isUnaryExpression,
    isArrowFunctionExpression,
    isIfStatement,
]);

const isIfUp = (path) => {
    const ifPath = path.find(isIfStatement);
    let is = false;
    
    if (!ifPath)
        return is;
    
    ifPath
        .get('test')
        .traverse({
            MemberExpression(currentPath) {
                if (path === currentPath) {
                    is = true;
                    path.stop();
                }
            },
        });
    
    return is;
};

module.exports.likeChain = likeChain;
function likeChain(path) {
    const [root, properties] = chain(path);
    
    if (isExcludedFromChain(root))
        return false;
    
    if (path.find(isIfUp))
        return false;
    
    const calls = properties.filter(isCall);
    const [firstCall] = calls;
    
    if (calls.length === 2 && !firstCall.name)
        return false;
    
    if (isArgOfCall(path))
        return false;
    
    return calls.length > 1;
}
