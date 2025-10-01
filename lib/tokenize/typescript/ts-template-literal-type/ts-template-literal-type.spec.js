'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: typescript: TSTemplateLiteralType', (t) => {
    t.print(fixture.tsTemplateLiteralType);
    t.end();
});
