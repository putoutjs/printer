import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: typescript: TSTypeReference', (t) => {
    t.print(fixture.tsTypeReference);
    t.end();
});
