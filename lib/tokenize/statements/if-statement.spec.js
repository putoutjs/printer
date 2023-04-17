'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../test/printer');
const {readFixtures} = require('../../../test/fixture');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: if-statement', (t) => {
    t.print(fixture.ifStatement);
    t.end();
});

test('printer: tokenizer: if-newline', (t) => {
    t.print(fixture.ifNewline);
    t.end();
});
