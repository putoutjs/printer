'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../test/printer');
const {readFixtures} = require('../../../test/fixture');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: array-expression', (t) => {
    t.print(fixture.arrayExpression);
    t.end();
});

test('printer: tokenizer: array-expression: newline', (t) => {
    t.print(fixture.arrayExpressionNewline);
    t.end();
});

test('printer: tokenizer: array-expression: tuple-member', (t) => {
    t.print(fixture.arrayExpressionTupleMember);
    t.end();
});
