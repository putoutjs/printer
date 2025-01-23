'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: conditional-expression', (t) => {
    t.print(fixture.conditionalExpression);
    t.end();
});
