import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: typescript: TSInferType', (t) => {
    t.print(fixture.tsInferType);
    t.end();
});
