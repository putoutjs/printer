'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('putout: printer: statement: with-statement', (t) => {
    t.print(fixture.withStatement);
    t.end();
});

test('putout: printer: statement: with-statement: indent', (t) => {
    t.print(fixture.withStatementIndent);
    t.end();
});

test('putout: printer: statement: with-statement: minify', (t) => {
    t.print(fixture.withStatementMinify, {
        format: {
            space: '',
        },
    });
    t.end();
});
