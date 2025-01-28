'use strict';

const {maybePrintComputed} = require('../object-expression/maybe-print-computed');
const {maybeParens} = require('../../maybe/maybe-parens');
const {isLooksLikeChain} = require('./is-looks-like-chain');

module.exports.MemberExpression = (path, printer) => {
    const {
        print,
        maybe,
        traverse,
    } = printer;
    
    const object = path.get('object');
    const property = path.get('property');
    const isParens = object.isAssignmentExpression();
    const {computed} = path.node;
    
    const isChain = isLooksLikeChain(path);
    
    maybe.print(isParens, '(');
    traverse(object);
    maybe.print(isParens, ')');
    
    if (computed)
        return maybePrintComputed(path, property, printer);
    
    maybe.indent.inc(isChain);
    maybe.print.breakline(isChain);
    
    print('.');
    print('__property');
    maybe.indent.dec(isChain);
};

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
