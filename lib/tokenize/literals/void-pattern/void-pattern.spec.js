'use strict';

const {createTest} = require('#test');

const {test, fixture} = createTest(__dirname);

test('printer: tokenize: literals: VoidPattern', (t) => {
    t.print(fixture.voidPattern);
    t.end();
});
