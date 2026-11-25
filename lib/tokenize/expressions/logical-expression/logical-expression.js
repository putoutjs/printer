import {maybeParens} from '#maybe-parens';
import {createTypeChecker} from '#type-checker';
import {isNewlineComment} from '../binary-expression/comments.js';
import {
    hasBinaryComments,
    printBinaryWithComments,
} from '../binary-expression/operand-comments.js';
import {chain, isRootOk} from './chain.js';

const condition = createTypeChecker([
    '+: parentPath -> UnaryExpression',
    '+: parentPath -> AwaitExpression',
]);

export const LogicalExpression = maybeParens({
    condition,
    print(path, printer, semantics) {
        const {print, maybe} = printer;
        const {operator} = path.node;
        
        if (hasBinaryComments(path))
            return printBinaryWithComments(path, printer);
        
        print('__left');
        
        const needNewLine = isNewline(path, semantics);
        
        maybe.indent.inc(needNewLine);
        needNewLine ? print.breakline() : print.space();
        maybe.indent.dec(needNewLine);
        
        print(operator);
        maybe.print.space(!isNewlineComment(path.get('right')));
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
