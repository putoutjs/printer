import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: typescript: TSTypeAliasDeclaration: newline', (t) => {
    t.print(fixture.tsTypeAliasDeclarationNewline);
    t.end();
});

test('printer: tokenizer: typescript: TSType: declare', (t) => {
    t.print(fixture.tsTypeDeclare);
    t.end();
});
