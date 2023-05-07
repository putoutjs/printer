'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: statement: export: newline', (t) => {
    t.print(fixture.exportNewline);
    t.end();
});

test('printer: tokenizer: statement: export-all-declaration', (t) => {
    t.print(fixture.exportAllDeclaration);
    t.end();
});

test('printer: tokenizer: statement: export-default-declaration', (t) => {
    t.print(fixture.exportDefaultFunction);
    t.end();
});
