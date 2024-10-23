'use strict';

const {extend} = require('supertape');

const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: typescript: ts-type-parameter', (t) => {
    t.print(fixture.tsTypeParameter);
    t.end();
});

test('printer: tokenizer: typescript: ts-type-parameter: default', (t) => {
    t.print(fixture.tsTypeParameterDefault);
    t.end();
});
