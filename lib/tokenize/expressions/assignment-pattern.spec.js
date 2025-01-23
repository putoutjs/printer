'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: assignment-pattern', (t) => {
    t.print(fixture.assignmentPattern);
    t.end();
});
