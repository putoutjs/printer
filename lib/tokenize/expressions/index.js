'use strict';

const functions = require('./function/functions');
const unaryExpressions = require('./unary-expression/unary-expressions');
const memberExpressions = require('./member-expression/member-expressions');

const {
    ClassExpression,
    ClassDeclaration,
} = require('./class/class');

const {
    CallExpression,
    OptionalCallExpression,
} = require('./call-expression/call-expression');

const {NewExpression} = require('./new-expression/new-expression');

const {ObjectExpression} = require('./object-expression/object-expression');
const {ObjectProperty} = require('./object-expression/object-property');
const {ObjectPattern} = require('./object-pattern/object-pattern');

const {
    ClassProperty,
    ClassAccessorProperty,
    ClassPrivateProperty,
    PrivateName,
} = require('./class/class-property');

const {AssignmentExpression} = require('./assignment-expression/assignment-expression');
const {ArrayExpression} = require('./array-expression/array-expression');
const {ArrayPattern} = require('./array-pattern/array-pattern');
const {AssignmentPattern} = require('./assignment-pattern');
const {RestElement} = require('./rest-element');
const {SpreadElement} = require('./spread-element');
const {SequenceExpression} = require('./sequence-expression/sequence-expression');
const {TaggedTemplateExpression} = require('./tagged-template-expression');
const {BinaryExpression} = require('./binary-expression/binary-expression');
const {LogicalExpression} = require('./logical-expression/logical-expression');
const {ConditionalExpression} = require('./conditional-expression');
const {StaticBlock} = require('./class/static-block');
const {RecordExpression} = require('./object-expression/record-expression');
const {TupleExpression} = require('./array-expression/tuple-expression');
const {ImportExpression} = require('./import-expression');
const {ParenthesizedExpression} = require('./parenthesized-expression/parenthesized-expression');

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
    ClassAccessorProperty,
    ClassPrivateProperty,
    ClassDeclaration,
    ConditionalExpression,
    NewExpression,
    LogicalExpression,
    OptionalCallExpression,
    ObjectExpression,
    ObjectProperty,
    ObjectPattern,
    ParenthesizedExpression,
    PrivateName,
    RestElement,
    ImportExpression,
    SpreadElement,
    SequenceExpression,
    StaticBlock,
    TaggedTemplateExpression,
    ThisExpression(path, {write}) {
        write('this');
    },
    RecordExpression,
    TupleExpression,
};
