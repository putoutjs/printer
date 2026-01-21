import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: import-expression', (t) => {
    t.print(fixture.importExpression);
    t.end();
});
