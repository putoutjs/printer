import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: typescript: ts-type-parameter', (t) => {
    t.print(fixture.tsTypeParameter);
    t.end();
});

test('printer: tokenizer: typescript: ts-type-parameter: default', (t) => {
    t.print(fixture.tsTypeParameterDefault);
    t.end();
});
