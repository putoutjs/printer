'use strict';

const functions = require('./functions');
const {CallExpression} = require('./call-expression');

module.exports = {
    ...functions,
    CallExpression,
    BinaryExpression(path, {traverse, write}) {
        traverse(path.get('left'));
        write(` ${path.node.operator} `);
        traverse(path.get('right'));
    },
};
