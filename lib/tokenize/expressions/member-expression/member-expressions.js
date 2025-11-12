'use strict';

const {types} = require('@putout/babel');
const {maybePrintComputed} = require('../object-expression/maybe-print-computed');
const {maybeParens} = require('../../maybe/maybe-parens');
const {isLooksLikeChain} = require('./is-looks-like-chain');

const {
    isObjectExpression,
    isArrowFunctionExpression,
} = types;

module.exports.MemberExpression = maybeParens({
    checkParens: false,
    condition: (path) => isObjectInsideArrow(path),
    print: (path, printer) => {
        const {
            print,
            maybe,
            traverse,
        } = printer;
        
        const object = path.get('object');
        const property = path.get('property');
        
        const {computed} = path.node;
        
        const isChain = isLooksLikeChain(path);
        
        traverse(object);
        
        if (computed)
            return maybePrintComputed(path, property, printer);
        
        maybe.indent.inc(isChain);
        maybe.print.breakline(isChain);
        
        print('.');
        print('__property');
        maybe.indent.dec(isChain);
    },
});

module.exports.OptionalMemberExpression = maybeParens((path, {print, maybe}) => {
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
});

const isObjectInsideArrow = ({node, parentPath}) => {
    if (!isObjectExpression(node.object))
        return false;
    
    return isArrowFunctionExpression(parentPath);
};
