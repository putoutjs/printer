'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

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
