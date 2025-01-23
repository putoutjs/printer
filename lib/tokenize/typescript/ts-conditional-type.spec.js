'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: typescript: TSConditionalType', (t) => {
    t.print(fixture.tsConditionalTypeIndent);
    t.end();
});
