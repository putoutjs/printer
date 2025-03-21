'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: statement: export default: arrow: var', (t) => {
    t.print(fixture.exportDefaultArrowVar);
    t.end();
});
