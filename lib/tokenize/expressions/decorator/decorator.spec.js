'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: expressions: decorator', (t) => {
    t.print(fixture.decorator);
    t.end();
});
