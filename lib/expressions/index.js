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
    UnaryExpression(path, {traverse, write}) {
        const {prefix, operator} = path.node;
        
        if (prefix)
            write(operator);
        
        traverse(path.get('argument'));
        
        if (!prefix)
            write(operator);
    },
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

