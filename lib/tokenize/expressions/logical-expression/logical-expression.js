'use strict';

const {maybeParens} = require('../../maybe/maybe-parens');
const {chain, isRootOk} = require('./chain');

module.exports.LogicalExpression = maybeParens({
    condition(path) {
        if (path.parentPath.isUnaryExpression())
            return true;
        
        return path.parentPath.isAwaitExpression();
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
});

function isNewLine(path, semantics) {
    const [root, count] = chain(path);
    
    if (!isRootOk(root))
        return false;
    
    if (count <= semantics.maxLogicalsInOneLine)
        return false;
    
    const {operator} = path.node;
    
    return operator === '||' || operator === '&&';
}
