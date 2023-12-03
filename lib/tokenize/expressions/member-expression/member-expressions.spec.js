'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');

const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: member-expression', (t) => {
    t.print(fixture.memberExpression);
    t.end();
});

test('printer: tokenizer: optional-member-expression', (t) => {
    t.print(fixture.optionalMemberExpression);
    t.end();
});

test('printer: tokenizer: member-expression: nested', (t) => {
    t.print(fixture.memberExpressionNested);
    t.end();
});

test('printer: tokenizer: member-expression: object', (t) => {
    t.print(fixture.memberExpressionObject);
    t.end();
});

test('printer: tokenizer: member-expression: chain: if', (t) => {
    t.print(fixture.memberExpressionChainIf);
    t.end();
});
