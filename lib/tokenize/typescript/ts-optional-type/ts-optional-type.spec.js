import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: typescript: TSOptionalType', (t) => {
    t.print(fixture.tsOptionalType);
    t.end();
});
