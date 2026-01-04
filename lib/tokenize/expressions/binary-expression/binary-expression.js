import {
    concatenate,
    isConcatenation,
} from './concatenate.js';
import {maybeSpace} from './maybe-space.js';
import {maybeParens} from '../../maybe/maybe-parens.js';

export const BinaryExpression = maybeParens((path, {print, indent, maybe}) => {
    const {operator} = path.node;
    
    if (operator === 'in' || operator === 'instanceof') {
        print('__left');
        print(' ');
        print(operator);
        print(' ');
        print('__right');
        
        return;
    }
    
    if (isConcatenation(path))
        return concatenate(path, {
            print,
            indent,
            maybe,
        });
    
    print('__left');
    print.space();
    print(path.node.operator);
    maybeSpace(path, {
        print,
    });
    print('__right');
});
