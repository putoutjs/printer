'use strict';

const {
    concatenate,
    isConcatenation,
} = require('./concatenate');

const {maybeSpace} = require('./maybe-space');
const {isParens} = require('../../maybe/maybe-parens');

const BinaryExpression = {
    condition(path) {
        if (isParens(path))
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
        
        if (operator === 'in') {
            print('__left');
            print(' in ');
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
    },
    after(path, {print}) {
        print(')');
    },
};

module.exports.BinaryExpression = BinaryExpression;
module.exports.LogicalExpression = BinaryExpression;
