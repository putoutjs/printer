'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: typescript: TSIntersectionType', (t) => {
    t.print(fixture.tsIntersectionType);
    t.end();
});
