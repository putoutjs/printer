import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: unary-expression: await-expression', (t) => {
    t.print(fixture.awaitExpression);
    t.end();
});

test('printer: tokenizer: unary-expression: throw', (t) => {
    t.print(fixture.unaryThrow);
    t.end();
});

test('printer: tokenizer: unary-expression: update-expression-parens', (t) => {
    t.print(fixture.updateExpressionParens);
    t.end();
});

test('printer: tokenizer: unary-expression: await-expression: parens', (t) => {
    t.print(fixture.awaitExpressionParens);
    t.end();
});
