'use strict';

const {createTest} = require('@putout/test');
const declare = require('.');

const test = createTest(__dirname, {
    'printer/add-args': declare,
});

test('rule: add-args: transform', (t) => {
    t.transform('add-args');
    t.end();
});
