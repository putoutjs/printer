import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: statement: do-while', (t) => {
    t.print(fixture.doWhileStatement);
    t.end();
});

test('printer: tokenizer: statement: do-while: minify', (t) => {
    t.print(fixture.doWhileStatementMinify, {
        format: {
            space: '',
        },
    });
    t.end();
});
