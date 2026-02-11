import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: statement: export-all-declaration', (t) => {
    t.print(fixture.exportAllDeclaration);
    t.end();
});

test('printer: tokenizer: statement: export-all-type', (t) => {
    t.print(fixture.exportAllType);
    t.end();
});

test('printer: tokenizer: statement: export-all-declaration: with attributes', (t) => {
    t.print(fixture.exportAllWithAttributes);
    t.end();
});
