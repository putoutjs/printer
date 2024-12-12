'use strict';

const {
    concatenate,
    isConcatenation,
} = require('./concatenate');

const {maybeSpace} = require('./maybe-space');
const {isParens} = require('../../maybe/maybe-parens');
const {chain, isRootOk} = require('./chain');

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
        
        const needNewLine = isNewLine(path, semantics);
        
        maybe.indent.inc(needNewLine);
        
        needNewLine ? print.breakline() : print.space();
        
        maybe.indent.dec(needNewLine);
        
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

function isNewLine(path, semantics) {
    const [root, count] = chain(path);
    
    if (!isRootOk(root))
        return false;
    
    if (count <= semantics.maxElementsInOneLine)
        return false;
    
    const {operator} = path.node;
    
    return operator === '||' || operator === '&&';
}
        
