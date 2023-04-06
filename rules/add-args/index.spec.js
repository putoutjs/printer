'use strict';

const {createTest} = require('@putout/test');
const declare = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['printer/add-args', declare],
    ],
});

test('rule: add-args: transform', (t) => {
    t.transform('add-args');
    t.end();
});

test('rule: add-args: transform: traverse', (t) => {
    t.transform('traverse');
    t.end();
});
