'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');

const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: unary-expression: await-expression', (t) => {
    t.print(fixture.awaitExpression);
    t.end();
});

test('printer: tokenizer: unary-expression: throw', (t) => {
    t.print(fixture.unaryThrow);
    t.end();
});

test('printer: tokenizer: unary-expression: update-expression-parens', (t) => {
    t.print(fixture.updateExpressionParens);
    t.end();
});

test('printer: tokenizer: unary-expression: await-expression: parens', (t) => {
    t.print(fixture.awaitExpressionParens);
    t.end();
});
