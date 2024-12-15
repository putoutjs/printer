'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: typescript: TSEnumDeclaration', (t) => {
    t.print(fixture.tsEnumDeclaration);
    t.end();
});

test('printer: tokenizer: typescript: TSEnumDeclarationNoInitializer', (t) => {
    t.print(fixture.tsEnumDeclarationNoInitializer);
    t.end();
});

test('printer: tokenizer: typescript: TSEnumDeclarationInsideNamespace', (t) => {
    t.print(fixture.tsEnumDeclarationInsideNamespace);
    t.end();
});
