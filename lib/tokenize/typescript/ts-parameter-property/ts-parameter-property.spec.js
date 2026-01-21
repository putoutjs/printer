import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: typescript: TSParameterProperty', (t) => {
    t.print(fixture.tsParameterProperty);
    t.end();
});
