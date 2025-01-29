'use strict';

const {createTest} = require('#test');

const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: statement: continue-statement: indent', (t) => {
    t.print(fixture.continueStatementIndent);
    t.end();
});
