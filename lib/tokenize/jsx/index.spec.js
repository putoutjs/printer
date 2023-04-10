'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../test/printer');
const {readFixtures} = require('../../../test/fixture');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: jsx: jsx-element', (t) => {
    t.print(fixture.jsxElement);
    t.end();
});

test('printer: tokenizer: jsx: jsx-expression-container', (t) => {
    t.print(fixture.jsxExpressionContainer);
    t.end();
});
