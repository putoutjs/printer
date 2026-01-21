import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: spread-element', (t) => {
    t.print(fixture.spreadElement);
    t.end();
});
