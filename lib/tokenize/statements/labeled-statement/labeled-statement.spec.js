import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('putout: printer: statement: labeled-statement', (t) => {
    t.print(fixture.labeledStatement);
    t.end();
});

test('putout: printer: statement: labeled-statement: nested', (t) => {
    t.print(fixture.labeledStatementNested);
    t.end();
});

test('putout: printer: statement: labeled-statement: indent', (t) => {
    t.print(fixture.labeledStatementIndent);
    t.end();
});
