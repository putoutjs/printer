'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('putout: printer: statement: labeled-statement', (t) => {
    t.print(fixture.labeledStatement);
    t.end();
});

test('putout: printer: statement: labeled-statement: nested', (t) => {
    t.print(fixture.labeledStatementNested);
    t.end();
});
