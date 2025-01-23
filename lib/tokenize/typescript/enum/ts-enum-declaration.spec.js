'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

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
