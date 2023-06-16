'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../test/printer');
const {readFixtures} = require('../../../test/fixture');

const {parse, transform} = require('putout');

const {print} = require('../../printer');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: jsx: jsx-element', (t) => {
    t.print(fixture.jsxElement);
    t.end();
});

test('printer: tokenizer: jsx: jsx-expression-container', (t) => {
    t.print(fixture.jsxExpressionContainer);
    t.end();
});

test('printer: tokenizer: jsx: var', (t) => {
    t.print(fixture.var);
    t.end();
});

test('printer: tokenizer: jsx: one-line', (t) => {
    t.print(fixture.oneLine);
    t.end();
});

test('printer: tokenizer: jsx: spread-attribute', (t) => {
    t.print(fixture.jsxSpreadAttribute);
    t.end();
});

test('printer: tokenizer: jsx: member-expression', (t) => {
    t.print(fixture.jsxMemberExpression);
    t.end();
});

test('printer: tokenizer: jsx: member-expression: transform', (t) => {
    const source = fixture.jsxMemberExpression;
    const ast = parse(source);
    
    transform(ast, source, {
        plugins: ['react-hooks'],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.jsxMemberExpressionFix);
    t.end();
});

test('printer: tokenizer: jsx: fragment', (t) => {
    t.print(fixture.jsxFragment);
    t.end();
});

test('printer: tokenizer: jsx: attribute', (t) => {
    t.print(fixture.jsxAttribute);
    t.end();
});

test('printer: tokenizer: jsx: arrow', (t) => {
    t.print(fixture.jsxArrow);
    t.end();
});
