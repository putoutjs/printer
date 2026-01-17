import {types} from '@putout/babel';
import {maybeParens} from '#maybe-parens';
import {maybePrintComputed} from '../object-expression/maybe-print-computed.js';
import {isLooksLikeChain} from './is-looks-like-chain.js';

const {
    isObjectExpression,
    isArrowFunctionExpression,
} = types;

export const MemberExpression = maybeParens({
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

export const OptionalMemberExpression = maybeParens((path, {print, maybe}) => {
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
