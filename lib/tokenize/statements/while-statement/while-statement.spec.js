import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('putout: printer: statement: while-statement: indent', (t) => {
    t.print(fixture.whileStatementIndent);
    t.end();
});

test('putout: printer: statement: while-statement: trailing comment: block', (t) => {
    t.print(fixture.whileTrailingCommentBlock);
    t.end();
});

test('putout: printer: statement: while-statement: trailing comment: line', (t) => {
    t.print(fixture.whileTrailingCommentLine);
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
