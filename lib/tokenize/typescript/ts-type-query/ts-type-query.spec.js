'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: typescript: ts-type-query', (t) => {
    t.print(fixture.tsTypeQuery);
    t.end();
});
