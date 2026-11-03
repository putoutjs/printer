import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: struct-declration', (t) => {
    t.print(fixture.structDeclaration);
    t.end();
});
