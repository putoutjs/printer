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

test('printer: tokenizer: typescript: ts-qualified-name', (t) => {
    t.print(fixture.tsQualifiedName);
    t.end();
});

test('printer: tokenizer: typescript: ts-string-keyword', (t) => {
    t.print(fixture.tsStringKeyword);
    t.end();
});

test('printer: tokenizer: typescript: fn', (t) => {
    t.print(fixture.fn);
    t.end();
});

test('printer: tokenizer: typescript: ts-mapped-type', (t) => {
    t.print(fixture.tsMappedType);
    t.end();
});

test('printer: tokenizer: typescript: ts-boolean-keyword', (t) => {
    t.print(fixture.tsBooleanKeyword);
    t.end();
});

test('printer: tokenizer: typescript: ts-interface-declaration', (t) => {
    t.print(fixture.tsInterfaceDeclaration);
    t.end();
});

test('printer: tokenizer: typescript: ts-as-expression', (t) => {
    t.print(fixture.tsAsExpression);
    t.end();
});

test('printer: tokenizer: typescript: ts-parenthesized-type', (t) => {
    t.print(fixture.tsParenthesizedType);
    t.end();
});

test('printer: tokenizer: typescript: ts-type-parameter', (t) => {
    t.print(fixture.tsTypeParameter);
    t.end();
});

test('printer: tokenizer: typescript: ts-conditional-type', (t) => {
    t.print(fixture.tsConditionalType);
    t.end();
});

test('printer: tokenizer: typescript: export-namespace-specifier', (t) => {
    t.print(fixture.exportNamespaceSpecifier);
    t.end();
});

test('printer: tokenizer: typescript: ts-declare-function', (t) => {
    t.print(fixture.tsDeclareFunction);
    t.end();
});

test('printer: tokenizer: typescript: ts-module-declaration', (t) => {
    t.print(fixture.tsModuleDeclaration);
    t.end();
});

test('printer: tokenizer: typescript: ts-module-declaration: last', (t) => {
    t.print(fixture.tsModuleDeclarationLast);
    t.end();
});

test('printer: tokenizer: typescript: ts-big-int-keyword', (t) => {
    t.print(fixture.tsBigIntKeyword);
    t.end();
});

test('printer: tokenizer: typescript: ts-null-keyword', (t) => {
    t.print(fixture.tsNullKeyword);
    t.end();
});

test('printer: tokenizer: typescript: ts-symbol-keyword', (t) => {
    t.print(fixture.tsSymbolKeyword);
    t.end();
});

test('printer: tokenizer: typescript: ts-object-keyword', (t) => {
    t.print(fixture.tsObjectKeyword);
    t.end();
});
