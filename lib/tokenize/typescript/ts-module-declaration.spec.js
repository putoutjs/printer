'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../test/printer');
const {readFixtures} = require('../../../test/fixture');
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
