'use strict';

module.exports.BinaryExpression = BinaryExpression;
module.exports.LogicalExpression = BinaryExpression;

const isLogical = (main, path) => {
    const is = path.isLogicalExpression();
    
    if (!is)
        return false;
    
    return main.node.operator !== path.node.operator;
};

function BinaryExpression(path, {write, traverse, maybe}) {
    const left = path.get('left');
    const right = path.get('right');
    const isLeft = isLogical(path, left);
    const isRight = isLogical(path, right);
    
    maybe.write(isLeft, '(');
    traverse(left);
    maybe.write(isLeft, ')');
    write.space();
    write(path.node.operator);
    write.space();
    maybe.write(isRight, '(');
    traverse(right);
    maybe.write(isRight, ')');
}
