'use strict';

const {createTest} = require('#test');
const {parse, transform} = require('putout');

const {print} = require('#printer');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: statement: break-statement', (t) => {
    t.print(fixture.breakStatement);
    t.end();
});

