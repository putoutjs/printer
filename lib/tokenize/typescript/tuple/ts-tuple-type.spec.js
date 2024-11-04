'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: typescript: TSTupleType', (t) => {
    t.print(fixture.tsTupleType);
    t.end();
});

test('printer: tokenizer: typescript: TSTupleType: empty', (t) => {
    t.print(fixture.tsTupleTypeEmpty);
    t.end();
});

test('printer: tokenizer: typescript: TSTupleType: different', (t) => {
    t.print(fixture.tsTupleTypeDifferent);
    t.end();
});
