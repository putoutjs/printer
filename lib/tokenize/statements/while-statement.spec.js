'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('putout: printer: statement: while-statement: indent', (t) => {
    t.print(fixture.whileStatementIndent);
    t.end();
});
