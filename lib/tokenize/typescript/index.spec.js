'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../test/printer');
const {readFixtures} = require('../../../test/fixture');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: typescript: any', (t) => {
    t.print(fixture.any);
    t.end();
});

test('printer: tokenizer: typescript: implements', (t) => {
    t.print(fixture.implements);
    t.end();
});

test('printer: tokenizer: typescript: ts-type-annotation', (t) => {
    t.print(fixture.tsTypeAnnotation);
    t.end();
});

test('printer: tokenizer: typescript: ts-type-alias-declaration', (t) => {
    t.print(fixture.tsTypeAliasDeclaration);
    t.end();
});

test('printer: tokenizer: typescript: ts-union-type', (t) => {
    t.print(fixture.tsUnionType);
    t.end();
});

test('printer: tokenizer: typescript: TSInstantiationExpression', (t) => {
    t.print(fixture.tsInstantiationExpression);
    t.end();
});
