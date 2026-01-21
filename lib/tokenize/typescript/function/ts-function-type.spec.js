import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: typescript: ts-function-type', (t) => {
    t.print(fixture.tsFunctionType);
    t.end();
});

test('printer: tokenizer: typescript: ts-function-type: parens', (t) => {
    t.print(fixture.tsFunctionTypeParens);
    t.end();
});
