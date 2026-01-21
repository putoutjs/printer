import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: typescript: ts-as-expression-new', (t) => {
    t.print(fixture.tsAsExpressionNew);
    t.end();
});

test('printer: tokenizer: typescript: ts-as-expression: object', (t) => {
    t.print(fixture.tsAsExpressionObject);
    t.end();
});
