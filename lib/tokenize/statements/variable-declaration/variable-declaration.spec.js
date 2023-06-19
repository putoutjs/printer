'use strict';

const {parse} = require('putout');
const {extend} = require('supertape');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');
const {print} = require('../../../printer');

const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('putout: printer: variable-declaration: newline', (t) => {
    const source = 'var b = a ** 8;\n';
    const ast = parse(source);
    const result = print(ast);
    
    t.equal(result, source);
    t.end();
});

test('putout: printer: variable-declaration: export', (t) => {
    const source = 'export const x = () => 5;\n';
    const ast = parse(source);
    const result = print(ast);
    
    t.equal(result, source);
    t.end();
});

test('putout: printer: statement: variable-declaration: const: newline', (t) => {
    t.print(fixture.constNewline);
    t.end();
});

test('printer: tokenizer: statement: variable-declaration: inside-body: newline', (t) => {
    t.print(fixture.constInsideBodyNewline);
    t.end();
});

test('printer: tokenizer: statement: variable-declaration: const: one-one: call', (t) => {
    t.print(fixture.constOneOneCall);
    t.end();
});

test('printer: tokenizer: statement: variable-declaration: const-couple', (t) => {
    t.print(fixture.constCouple);
    t.end();
});

test('printer: tokenizer: statement: variable-declaration: const-couple: one line', (t) => {
    t.print(fixture.constCoupleOneLine);
    t.end();
});

test('printer: tokenizer: statement: variable-declaration: const-couple: maxVariablesInOneLine', (t) => {
    t.print(fixture.constMaxVariablesInOneLine);
    t.end();
});

test('printer: tokenizer: statement: variable-declaration: var', (t) => {
    t.print(fixture.var);
    t.end();
});

test('printer: tokenizer: statement: variable-declaration: const-new-lines', (t) => {
    t.print(fixture.constNewlines);
    t.end();
});

test('printer: tokenizer: variable-declaration: space', (t) => {
    const ast = parse(fixture.varSpace);
    
    const result = print(ast, {
        format: {
            space: '',
            indent: '',
            newline: '',
        },
    });
    
    t.equal(result, fixture.varSpaceFix);
    t.end();
});
