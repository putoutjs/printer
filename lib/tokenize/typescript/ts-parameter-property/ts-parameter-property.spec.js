'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: typescript: TSParameterProperty', (t) => {
    t.print(fixture.tsParameterProperty);
    t.end();
});
