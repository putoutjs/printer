'use strict';

const {
    concatanate,
    isConcatenation,
} = require('./concatanate');

const {maybeSpace} = require('./maybe-space');

const BinaryExpression = {
    condition(path) {
        const parens = path.node.extra?.parenthesized;
        
        if (parens)
            return true;
        
        return path.parentPath.isAwaitExpression();
    },
    before(path, {print}) {
        print('(');
    },
    print(path, {print, indent, maybe}) {
        const {operator} = path.node;
        
        if (operator === 'instanceof') {
            print('__left');
            print(' instanceof ');
            print('__right');
            
            return;
        }
        
        if (isConcatenation(path))
            return concatanate(path, {
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
    },
    after(path, {print}) {
        print(')');
    },
};

module.exports.BinaryExpression = BinaryExpression;
module.exports.LogicalExpression = BinaryExpression;
