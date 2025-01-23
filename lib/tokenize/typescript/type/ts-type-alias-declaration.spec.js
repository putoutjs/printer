'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: typescript: TSTypeAliasDeclaration: newline', (t) => {
    t.print(fixture.tsTypeAliasDeclarationNewline);
    t.end();
});

test('printer: tokenizer: typescript: TSType: declare', (t) => {
    t.print(fixture.tsTypeDeclare);
    t.end();
});
