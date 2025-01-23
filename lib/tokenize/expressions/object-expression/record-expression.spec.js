'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('putout: printer: expressions: record-expression', (t) => {
    t.print(fixture.recordExpression);
    t.end();
});
