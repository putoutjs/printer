'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: typescript: TSTypeAliasDeclaration: newline', (t) => {
    t.print(fixture.tsTypeAliasDeclarationNewline);
    t.end();
});

test('printer: tokenizer: typescript: TSType: declare', (t) => {
    t.print(fixture.tsTypeDeclare);
    t.end();
});
