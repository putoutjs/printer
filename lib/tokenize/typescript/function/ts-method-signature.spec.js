'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: typescript: ts-method-signature: getter', (t) => {
    t.print(fixture.tsMethodSignatureGetter);
    t.end();
});
