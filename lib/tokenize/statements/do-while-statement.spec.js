'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: statement: do-while', (t) => {
    t.print(fixture.doWhileStatement);
    t.end();
});
