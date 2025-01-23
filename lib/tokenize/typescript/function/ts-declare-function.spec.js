'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: typescript: ts-declare-function-type', (t) => {
    t.print(fixture.tsDeclareFunctionType);
    t.end();
});
