'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: typescript: ts-function-type', (t) => {
    t.print(fixture.tsFunctionType);
    t.end();
});

test('printer: tokenizer: typescript: ts-function-type: parens', (t) => {
    t.print(fixture.tsFunctionTypeParens);
    t.end();
});
