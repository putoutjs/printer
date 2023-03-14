'use strict';

const functions = require('./functions');
const arrays = require('./arrays');
const unaryExpressions = require('./unary-expressions');
const memberExpressions = require('./member-expressions');
const {CallExpression} = require('./call-expression');
const {ObjectExpression} = require('./object-expression');
const {ObjectPattern} = require('./object-pattern');
const {AssignmentExpression} = require('./assignment-expression');

module.exports = {
    ...functions,
    ...unaryExpressions,
    ...arrays,
    ...memberExpressions,
    AssignmentExpression,
    CallExpression,
    ObjectExpression,
    ObjectPattern,
    BinaryExpression(path, {traverse, write}) {
        traverse(path.get('left'));
        write(` ${path.node.operator} `);
        traverse(path.get('right'));
    },
    LogicalExpression(path, {traverse, write}) {
        traverse(path.get('left'));
        write(` ${path.node.operator} `);
        traverse(path.get('right'));
    },
};

