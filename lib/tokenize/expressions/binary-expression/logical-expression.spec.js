'use strict';

const {extend} = require('supertape');
const {parse} = require('putout');

const {print} = require('../../../printer');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: logical-expression: newline', (t) => {
    t.print(fixture.logicalExpressionNewline);
    t.end();
});

