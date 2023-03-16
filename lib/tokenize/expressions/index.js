'use strict';

const functions = require('./functions');
const unaryExpressions = require('./unary-expressions');
const memberExpressions = require('./member-expressions');

const {ClassDeclaration} = require('./class-declaration');
const {CallExpression} = require('./call-expression');
const {NewExpression} = require('./new-expression');
const {ObjectExpression} = require('./object-expression');
const {ObjectPattern} = require('./object-pattern');
const {AssignmentExpression} = require('./assignment-expression');
const {ArrayExpression} = require('./array-expression');
const {ArrayPattern} = require('./array-pattern');
const {AssignmentPattern} = require('./assignment-pattern');
const {RestElement} = require('./RestElement');
const {SpreadElement} = require('./SpreadElement');

module.exports = {
    ...functions,
    ...unaryExpressions,
    ...memberExpressions,
    ArrayPattern,
    ArrayExpression,
    AssignmentExpression,
    AssignmentPattern,
    CallExpression,
    ClassDeclaration,
    NewExpression,
    ObjectExpression,
    ObjectPattern,
    RestElement,
    SpreadElement,
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

