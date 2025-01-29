'use strict';

const {createTest} = require('#test');

const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: statement: break-statement', (t) => {
    t.print(fixture.breakStatement);
    t.end();
});
