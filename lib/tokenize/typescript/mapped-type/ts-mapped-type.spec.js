'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: typescript: TSMappedType: nameType', (t) => {
    t.print(fixture.tsMappedTypeNameType);
    t.end();
});

test('printer: tokenizer: typescript: TSMappedType: in', (t) => {
    t.print(fixture.tsMappedTypeIn);
    t.end();
});

test('printer: tokenizer: typescript: TSMappedType: no type annotation', (t) => {
    t.print(fixture.tsMappedTypeNoTypeAnnotation);
    t.end();
});
