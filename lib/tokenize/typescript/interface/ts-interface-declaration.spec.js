'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: typescript: interface: empty', (t) => {
    t.print(fixture.interfaceEmpty);
    t.end();
});

test('printer: tokenizer: typescript: interface: type', (t) => {
    t.print(fixture.interfaceType);
    t.end();
});

test('printer: tokenizer: typescript: interface: newline', (t) => {
    t.print(fixture.interfaceNewline);
    t.end();
});
