'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('putout: printer: statement: while-statement: indent', (t) => {
    t.print(fixture.whileStatementIndent);
    t.end();
});

test('putout: printer: statement: while-statement: minify', (t) => {
    t.print(fixture.whileStatementMinify, {
        format: {
            space: '',
        },
    });
    t.end();
});
