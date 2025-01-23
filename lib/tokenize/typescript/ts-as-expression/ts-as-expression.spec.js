'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: typescript: ts-as-expression-new', (t) => {
    t.print(fixture.tsAsExpressionNew);
    t.end();
});

test('printer: tokenizer: typescript: ts-as-expression: object', (t) => {
    t.print(fixture.tsAsExpressionObject);
    t.end();
});
