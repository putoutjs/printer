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
