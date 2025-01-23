'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('putout: printer: expressions: tuple-expression', (t) => {
    t.print(fixture.tupleExpression);
    t.end();
});
