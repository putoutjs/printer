'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: import-expression', (t) => {
    t.print(fixture.importExpression);
    t.end();
});
