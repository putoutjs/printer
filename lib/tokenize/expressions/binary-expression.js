'use strict';

module.exports.BinaryExpression = BinaryExpression;
module.exports.LogicalExpression = BinaryExpression;

function BinaryExpression(path, {print}) {
    print('__left');
    print.space();
    print(path.node.operator);
    print.space();
    print('__right');
}

