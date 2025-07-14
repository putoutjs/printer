'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

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
