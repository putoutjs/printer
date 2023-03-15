'use strict';

const functions = require('./functions');
const arrays = require('./arrays');
const unaryExpressions = require('./unary-expressions');
const memberExpressions = require('./member-expressions');
const {ClassDeclaration} = require('./class-declaration');
const {CallExpression} = require('./call-expression');
const {NewExpression} = require('./new-expression');
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
    ClassDeclaration,
    NewExpression,
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

