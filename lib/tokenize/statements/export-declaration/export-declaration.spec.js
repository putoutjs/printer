'use strict';

const {extend} = require('supertape');
const {parse} = require('putout');

const {print} = require('../../../printer');
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

test('printer: tokenizer: statement: export-from', (t) => {
    t.print(fixture.exportFrom);
    t.end();
});

test('printer: tokenizer: statement: export-from: couple', (t) => {
    t.print(fixture.exportFromCouple);
    t.end();
});

test('printer: tokenizer: statement: export-all-type', (t) => {
    t.print(fixture.exportAllType);
    t.end();
});

test('printer: tokenizer: statement: export: space', (t) => {
    const ast = parse(fixture.exportSpace);
    
    const result = print(ast, {
        format: {
            space: '',
            newline: '',
            indent: '',
            endOfFile: '',
        },
    });
    
    t.equal(result, fixture.exportSpaceFix);
    t.end();
});

test('printer: tokenizer: statement: export: empty', (t) => {
    t.print(fixture.exportEmpty);
    t.end();
});
