'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: typescript: TSOptionalType', (t) => {
    t.print(fixture.tsOptionalType);
    t.end();
});
