'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('putout: printer: statement: debugger-statement: newline', (t) => {
    t.print(fixture.debuggerStatementNewline);
    t.end();
});
