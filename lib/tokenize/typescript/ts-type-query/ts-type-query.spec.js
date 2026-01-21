import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: typescript: ts-type-query', (t) => {
    t.print(fixture.tsTypeQuery);
    t.end();
});
