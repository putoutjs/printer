'use strict';

const {isParens} = require('../../maybe/maybe-parens');
const {chain, isRootOk} = require('./chain');

module.exports.LogicalExpression = {
    condition(path) {
        if (isParens(path))
            return true;
        
        return path.parentPath.isAwaitExpression();
    },
    before(path, {print}) {
        print('(');
    },
    print(path, {print, maybe}, semantics) {
        print('__left');
        
        const needNewLine = isNewLine(path, semantics);
        
        maybe.indent.inc(needNewLine);
        needNewLine ? print.breakline() : print.space();
        maybe.indent.dec(needNewLine);
        
        print(path.node.operator);
        print.space();
        print('__right');
    },
    after(path, {print}) {
        print(')');
    },
};

function isNewLine(path, semantics) {
    const [root, count] = chain(path);
    
    if (!isRootOk(root))
        return false;
    
    if (count <= semantics.maxElementsInOneLine)
        return false;
    
    const {operator} = path.node;
    
    return operator === '||' || operator === '&&';
}
