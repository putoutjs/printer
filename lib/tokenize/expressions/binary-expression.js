'use strict';

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
    print(path, {write, traverse}) {
        const left = path.get('left');
        const right = path.get('right');
        
        traverse(left);
        write.space();
        write(path.node.operator);
        write.space();
        traverse(right);
    },
    after(path, {print}) {
        print(')');
    },
};

module.exports.BinaryExpression = BinaryExpression;
module.exports.LogicalExpression = BinaryExpression;
