'use strict';

const {createTest} = require('#test');
const {parse, transform} = require('putout');

const {print} = require('@putout/printer');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: statement: expression: leading comment', (t) => {
    t.print(fixture.expressionLeadingComment);
    t.end();
});

test('printer: tokenizer: statement: expression: inside arrow: leading comment', (t) => {
    t.print(fixture.expressionInsideArrowLeadingComment);
    t.end();
});

test('printer: tokenizer: statement: expression: inside body: leading comment', (t) => {
    t.print(fixture.expressionInsideBodyLeadingComment);
    t.end();
});
