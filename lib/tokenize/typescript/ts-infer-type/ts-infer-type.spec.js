'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: typescript: TSInferType', (t) => {
    t.print(fixture.tsInferType);
    t.end();
});
