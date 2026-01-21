import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: conditional-expression', (t) => {
    t.print(fixture.conditionalExpression);
    t.end();
});
