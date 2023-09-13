'use strict';

const {
    isUnaryExpression,
    isArrowFunctionExpression,
    isLogicalExpression,
    isIfStatement,
} = require('@putout/babel').types;

const {chain} = require('./chain');
const {satisfy} = require('../../is');

const isArgOfCall = (path) => path.parentPath.isCallExpression() && path.parentPath.get('arguments.0') === path;

module.exports.MemberExpression = (path, {print, maybe, traverse}) => {
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
    
    const isChain = likeChain(path);
    
    maybe.indent.inc(isChain);
    
    if (isChain) {
        print.breakline();
    }
    
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
    isLogicalExpression,
    isIfStatement,
]);

function likeChain(path) {
    const [root, properties] = chain(path);
    
    if (isExcludedFromChain(root))
        return false;
    
    const calls = properties.filter(isCall);
    const [firstCall] = calls;
    
    if (calls.length === 2 && !firstCall.name)
        return false;
    
    if (isArgOfCall(path)) {
        return false;
    }
    
    return calls.length > 1;
}
