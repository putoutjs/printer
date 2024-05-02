'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: typescript: ts-module-declaration-export', (t) => {
    t.print(fixture.tsModuleDeclarationExport);
    t.end();
});

test('printer: tokenizer: typescript: ts-module-declaration-couple', (t) => {
    t.print(fixture.tsModuleDeclarationCouple);
    t.end();
});

test('printer: tokenizer: typescript: namespace: declare', (t) => {
    t.print(fixture.tsNamespaceDeclare);
    t.end();
});

test('printer: tokenizer: typescript: ts-module-declaration-interface', (t) => {
    t.print(fixture.tsModuleDeclarationInterface);
    t.end();
});

test('printer: tokenizer: typescript: namespace: type', (t) => {
    t.print(fixture.tsNamespaceType);
    t.end();
});
