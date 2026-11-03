import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: struct-declaration', (t) => {
    t.print(fixture.structDeclaration);
    t.end();
});
