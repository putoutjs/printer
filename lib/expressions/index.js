'use strict';

const functions = require('./functions');
const {CallExpression} = require('./call-expression');
const {ObjectExpression} = require('./object-expression');
const {ObjectPattern} = require('./object-pattern');
const {AssignmentExpression} = require('./assignment-expression');

module.exports = {
    ...functions,
    AssignmentExpression,
    CallExpression,
    ObjectExpression,
    ObjectPattern,
    BinaryExpression(path, {traverse, write}) {
        traverse(path.get('left'));
        write(` ${path.node.operator} `);
        traverse(path.get('right'));
    },
    MemberExpression(path, {traverse, write}) {
        traverse(path.get('object'));
        write('.');
        traverse(path.get('property'));
    },
};

