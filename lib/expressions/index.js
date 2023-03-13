'use strict';

const functions = require('./functions');
const {CallExpression} = require('./call-expression');
const {ObjectExpression} = require('./object-expression');

module.exports = {
    ...functions,
    CallExpression,
    ObjectExpression,
    BinaryExpression(path, {traverse, write}) {
        traverse(path.get('left'));
        write(` ${path.node.operator} `);
        traverse(path.get('right'));
    },
    AssignmentExpression(path, {traverse, write}) {
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

