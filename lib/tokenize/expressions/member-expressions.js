'use strict';

const {
    isIfStatement,
    isIdentifier,
    isThisExpression,
    isUnaryExpression,
    isArrowFunctionExpression,
    isLogicalExpression,

} = require('@babel/types');

const {
    compare,
    getTemplateValues,
} = require('@putout/compare');
const {chain} = require('./chain/chain');

module.exports.MemberExpression = (path, {print, indent, maybe, traverse, write}) => {
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

const isCall = (a) => a.type === 'CallExpression';

function likeChain(path) {
    const [root, properties] = chain(path);
    
    if (isUnaryExpression(root))
        return false;
    
    if (isArrowFunctionExpression(root))
        return false;
    
    if (isLogicalExpression(root))
        return false;
    
    const calls = properties.filter(isCall);
    const [firstCall, secondCall] = calls;
    
    if (calls.length === 2 && !firstCall.name)
        return false;
    
    return calls.length > 1;
}

