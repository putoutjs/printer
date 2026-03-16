import {maybeParens} from '#maybe-parens';
import {createTypeChecker} from '#type-checker';
import {chain, isRootOk} from './chain.js';

const condition = createTypeChecker([
    '+: parentPath -> UnaryExpression',
    '+: parentPath -> AwaitExpression',
]);

export const LogicalExpression = maybeParens({
    condition,
    print(path, {print, maybe}, semantics) {
        const {operator} = path.node;
        
        print('__left');
        
        const needNewLine = isNewline(path, semantics);
        
        maybe.indent.inc(needNewLine);
        needNewLine ? print.breakline() : print.space();
        maybe.indent.dec(needNewLine);
        
        print(operator);
        print.space();
        print('__right');
    },
});

const callWithRoot = (fn) => (path, {maxLogicalsInOneLine}) => {
    const [root, count] = chain(path);
    
    if (!fn(root))
        return false;
    
    return count > maxLogicalsInOneLine;
};

const isNewline = createTypeChecker([
    ['-: -> !', callWithRoot(isRootOk)],
    ['+: node.operator ->', '=', '||'],
    ['+: node.operator ->', '=', '&&'],
]);
