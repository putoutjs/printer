import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: expressions: decorator', (t) => {
    t.print(fixture.decorator);
    t.end();
});
