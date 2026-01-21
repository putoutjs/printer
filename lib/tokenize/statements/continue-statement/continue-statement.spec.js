import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: statement: continue-statement: indent', (t) => {
    t.print(fixture.continueStatementIndent);
    t.end();
});
