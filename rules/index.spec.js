'use strict';

const {createTest} = require('@putout/test');
const printer = require('.');

const test = createTest(__dirname, {
    printer,
});

test('printer: add-args: transform', (t) => {
    t.transform('add-args');
    t.end();
});

test('printer: apply-computed-print: transform', (t) => {
    t.transform('apply-computed-print');
    t.end();
});

