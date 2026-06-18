import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: typescript: ts-import-equals-declaration', (t) => {
    t.print(fixture.tsImportEqualsDeclaration);
    t.end();
});

test('printer: tokenizer: typescript: ts-import-equals-declaration: multiple', (t) => {
    t.print(fixture.tsImportEqualsDeclarationMultiple);
    t.end();
});
