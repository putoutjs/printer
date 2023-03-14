'use strict';

const functions = require('./functions');
const unaryExpressions = require('./unary-expressions');
const {CallExpression} = require('./call-expression');
const {ObjectExpression} = require('./object-expression');
const {ObjectPattern} = require('./object-pattern');
const {AssignmentExpression} = require('./assignment-expression');

module.exports = {
    ...functions,
    ...unaryExpressions,
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
    MemberExpression(path, {traverse, write}) {
        const {computed} = path.node;
        const propertyPath = path.get('property');
        
        traverse(path.get('object'));
        
        if (computed) {
            write('[');
            traverse(propertyPath);
            write(']');
            
            return;
        }
        
        write('.');
        traverse(propertyPath);
    },
    ArrayPattern(path, {write, traverse}) {
        write('[');
        
        for (const element of path.get('elements')) {
            traverse(element);
        }
        
        write(']');
    },
};

