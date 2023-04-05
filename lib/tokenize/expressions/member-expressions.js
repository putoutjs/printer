'use strict';

const {isIfStatement} = require('@babel/types');
const isInnerCall = (path) => path.get('object').isCallExpression();
const isOuterCall = (path) => path.parentPath.isCallExpression();

module.exports.MemberExpression = (path, {print, indent, maybe}) => {
    const {computed} = path.node;
    print('__object');
    
    if (computed) {
        print('[');
        print('__property');
        print(']');
        
        return;
    }
    
    const isChain = looksLikeChain(path);
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

function looksLikeChain(path) {
    const {parentPath} = path;
    
    if (parentPath.parentPath.isStatement() && !parentPath.parentPath.isExpressionStatement())
        return false;
    
    if (path.find(isIfStatement))
        return false;
    
    if (isInnerCall(path) && isOuterCall(path))
        return true;
    
    return false;
}
