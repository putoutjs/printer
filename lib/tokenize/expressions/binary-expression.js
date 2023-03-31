'use strict';

module.exports.BinaryExpression = BinaryExpression;
module.exports.LogicalExpression = BinaryExpression;

const isLogical = (path) => path.isLogicalExpression();

function BinaryExpression(path, {write, traverse, maybe}) {
    const left = path.get('left');
    const right = path.get('right');
    const isLeft = isLogical(left);
    const isRight = isLogical(right);
    
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

