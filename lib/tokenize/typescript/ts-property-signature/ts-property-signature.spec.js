'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: typescript: TSPropertySignature: computed', (t) => {
    t.print(fixture.tsPropertySignatureComputed);
    t.end();
});
