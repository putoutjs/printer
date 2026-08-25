import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: typescript: TSInstantiationExpression', (t) => {
    t.print(fixture.tsInstantiationExpression);
    t.end();
});

test('printer: tokenizer: typescript: TSInstantiationExpression: parens', (t) => {
    t.print(fixture.tsInstantiationExpressionParens);
    t.end();
});
