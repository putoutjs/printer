import {maybeParens} from '#maybe-parens';
import {createTypeChecker} from '#type-checker';
import {maybePrintComputed} from '../object-expression/maybe-print-computed.js';
import {isLooksLikeChain} from './is-looks-like-chain/index.js';

const isObjectInsideArrow = createTypeChecker([
    '-: node.object -> !ObjectExpression',
    '+: parentPath -> ArrowFunctionExpression',
]);

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
