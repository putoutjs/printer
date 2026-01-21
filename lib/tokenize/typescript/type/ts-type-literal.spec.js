import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: typescript: ts-type-literal', (t) => {
    t.print(fixture.tsTypeLiteral);
    t.end();
});

test('printer: tokenizer: typescript: ts-type-literal-one', (t) => {
    t.print(fixture.tsTypeLiteralOne);
    t.end();
});

test('printer: tokenizer: typescript: ts-type-literal: property', (t) => {
    t.print(fixture.tsTypeLiteralProperty);
    t.end();
});
