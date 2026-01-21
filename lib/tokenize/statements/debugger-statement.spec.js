import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('putout: printer: statement: debugger-statement: newline', (t) => {
    t.print(fixture.debuggerStatementNewline);
    t.end();
});
