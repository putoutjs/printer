import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: typescript: TSNonNullExpression', (t) => {
    t.print(fixture.tsNonNullExpression);
    t.end();
});
