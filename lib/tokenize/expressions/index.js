'use strict';

const functions = require('./functions/functions');
const unaryExpressions = require('./unary-expressions');
const memberExpressions = require('./member-expressions/member-expressions');

const {
    ClassExpression,
    ClassDeclaration,
    StaticBlock,
} = require('./class');

const {
    CallExpression,
    OptionalCallExpression,
} = require('./call-expression');

const {NewExpression} = require('./new-expression');

const {ObjectExpression} = require('./object-expression/object-expression');
const {ObjectProperty} = require('./object-expression/object-property');
const {ObjectPattern} = require('./object-pattern');

const {
    ClassProperty,
    ClassPrivateProperty,
    PrivateName,
} = require('./class-property');

const {AssignmentExpression} = require('./assignment-expression');
const {ArrayExpression} = require('./array-expression/array-expression');
const {ArrayPattern} = require('./array-pattern');
const {AssignmentPattern} = require('./assignment-pattern');
const {RestElement} = require('./rest-element');
const {SpreadElement} = require('./spread-element');
const {SequenceExpression} = require('./sequence-expression');
const {TaggedTemplateExpression} = require('./tagged-template-expression');

const {
    BinaryExpression,
    LogicalExpression,
} = require('./binary-expression/binary-expression');

const {ConditionalExpression} = require('./conditional-expression');

module.exports = {
    ...functions,
    ...unaryExpressions,
    ...memberExpressions,
    ArrayPattern,
    ArrayExpression,
    AssignmentExpression,
    AssignmentPattern,
    BinaryExpression,
    CallExpression,
    ClassExpression,
    ClassProperty,
    ClassPrivateProperty,
    ClassDeclaration,
    ConditionalExpression,
    NewExpression,
    LogicalExpression,
    OptionalCallExpression,
    ObjectExpression,
    ObjectProperty,
    ObjectPattern,
    PrivateName,
    RestElement,
    SpreadElement,
    SequenceExpression,
    StaticBlock,
    TaggedTemplateExpression,
    ThisExpression(path, {print}) {
        print('this');
    },
};
