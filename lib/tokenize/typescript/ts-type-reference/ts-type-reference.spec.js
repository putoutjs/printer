'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: typescript: TSTypeReference', (t) => {
    t.print(fixture.tsTypeReference);
    t.end();
});
