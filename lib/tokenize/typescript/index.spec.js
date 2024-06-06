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

test('printer: tokenizer: typescript: ts-type-annotation: pattern', (t) => {
    t.print(fixture.tsTypeAnnotationPattern);
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

test('printer: tokenizer: typescript: ts-type-parameter-instantiation', (t) => {
    t.print(fixture.tsTypeParameterInstantiation);
    t.end();
});

test('printer: tokenizer: typescript: ts-type-parameter-declaration', (t) => {
    t.print(fixture.tsTypeParameterDeclaration);
    t.end();
});

test('printer: tokenizer: typescript: ts-type-parameter-declaration: coma', (t) => {
    t.print(fixture.tsTypeParameterDeclarationComa);
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

test('printer: tokenizer: typescript: ts-literal-type', (t) => {
    t.print(fixture.tsLiteralType);
    t.end();
});

test('printer: tokenizer: typescript: ts-parameter-property: assignment', (t) => {
    t.print(fixture.tsParameterPropertyAssignment);
    t.end();
});

test('printer: tokenizer: typescript: ts-index-signature', (t) => {
    t.print(fixture.tsIndexSignature);
    t.end();
});

test('printer: tokenizer: typescript: ts-call-signature-declaration', (t) => {
    t.print(fixture.tsCallSignatureDeclaration);
    t.end();
});

test('printer: tokenizer: typescript: declare-const', (t) => {
    t.print(fixture.declareConst);
    t.end();
});

test('printer: tokenizer: typescript: export-function', (t) => {
    t.print(fixture.exportFunction);
    t.end();
});

test('printer: tokenizer: typescript: export-type', (t) => {
    t.print(fixture.exportType);
    t.end();
});

test('printer: tokenizer: typescript: ts-type-predicate', (t) => {
    t.print(fixture.tsTypePredicate);
    t.end();
});

test('printer: tokenizer: typescript: ts-non-null-expression', (t) => {
    t.print(fixture.tsNonNullExpression);
    t.end();
});

test('printer: tokenizer: typescript: ts-import-equals-declaration', (t) => {
    t.print(fixture.tsImportEqualsDeclaration);
    t.end();
});

test('printer: tokenizer: typescript: class private', (t) => {
    t.print(fixture.classPrivate);
    t.end();
});

test('printer: tokenizer: typescript: ts-external-module-reference', (t) => {
    t.print(fixture.tsExternalModuleReference);
    t.end();
});

test('printer: tokenizer: typescript: ts-declared-method', (t) => {
    t.print(fixture.tsDeclaredMethod);
    t.end();
});

test('printer: tokenizer: typescript: ts-named-tuple-member', (t) => {
    t.print(fixture.tsNamedTupleMember);
    t.end();
});

test('printer: tokenizer: typescript: ts-public-property', (t) => {
    t.print(fixture.tsPublicProperty);
    t.end();
});

test('printer: tokenizer: typescript: ts-constructor-type', (t) => {
    t.print(fixture.tsConstructorType);
    t.end();
});

test('printer: tokenizer: typescript: ts-this-type', (t) => {
    t.print(fixture.tsThisType);
    t.end();
});

test('printer: tokenizer: typescript: static-property', (t) => {
    t.print(fixture.staticProperty);
    t.end();
});

test('printer: tokenizer: typescript: scopedConstructor', (t) => {
    t.print(fixture.scopedConstructor);
    t.end();
});

test('printer: tokenizer: typescript: declare-property', (t) => {
    t.print(fixture.declareProperty);
    t.end();
});

test('printer: tokenizer: typescript: ts-satisfies-expression', (t) => {
    t.print(fixture.tsSatisfiesExpression);
    t.end();
});

test('printer: tokenizer: typescript: class-method-private', (t) => {
    t.print(fixture.classMethodPrivate);
    t.end();
});
