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

test('printer: tokenizer: jsx: jsx-text', (t) => {
    t.print(fixture.jsxText);
    t.end();
});

test('printer: tokenizer: jsx: jsx-expression: simple', (t) => {
    t.print(fixture.jsxExpressionSimple);
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

test('printer: tokenizer: jsx: jsx-expression', (t) => {
    t.print(fixture.jsxExpressionFix);
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

test('printer: tokenizer: jsx: jsx-empty-expression', (t) => {
    t.print(fixture.jsxEmptyExpression);
    t.end();
});

test('printer: tokenizer: jsx: element: indent', (t) => {
    t.print(fixture.jsxElementIndent);
    t.end();
});

test('printer: tokenizer: jsx: return: comment', (t) => {
    t.print(fixture.jsxReturnComment);
    t.end();
});

test('printer: tokenizer: jsx: transform', (t) => {
    const source = fixture.jsxTransform;
    const ast = parse(source);
    
    transform(ast, source, {
        plugins: ['react-hook-form'],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.jsxTransformFix);
    t.end();
});

test('printer: tokenizer: jsx: print: encodedQuote', (t) => {
    const source = fixture.jsxEncodedQuote;
    const ast = parse(source);
    const result = print(ast);
    
    t.equal(result, fixture.jsxEncodedQuoteFix);
    t.end();
});

test('printer: tokenizer: jsx: jsx-encoded-quote: simple', (t) => {
    t.print(fixture.jsxEncodedQuoteSimple);
    t.end();
});

test('printer: tokenizer: jsx: block', (t) => {
    t.print(fixture.jsxBlock);
    t.end();
});

test('printer: tokenizer: jsx: text: gt', (t) => {
    t.print(fixture.jsxTextGt);
    t.end();
});
