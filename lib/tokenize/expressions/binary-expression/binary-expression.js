'use strict';

const {
    concatenate,
    isConcatenation,
} = require('./concatenate');

const {maybeSpace} = require('./maybe-space');
const {isParens} = require('../../maybe/maybe-parens');
const {chain, isRootOk} = require('./chain');
const {types} = require('@putout/babel');
const {
    isReturnStatement,
    isVariableDeclarator,
} = types;

const BinaryExpression = {
    condition(path) {
        if (isParens(path))
            return true;
        
        return path.parentPath.isAwaitExpression();
    },
    before(path, {print}) {
        print('(');
    },
    print(path, {print, indent, maybe}, semantics) {
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
        
        const [root, count] = chain(path);
        const isNewLine = isRootOk(root) && count > 3;
        
        maybe.indent.inc(isNewLine);
        
        if (isNewLine && (operator === '||' || operator === '&&'))
            print.breakline();
        else
            print.space();
        
        maybe.indent.dec(isNewLine);
        
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

