'use strict';

const {extend} = require('supertape');
const {visitors, maybePlugin} = require('./printer');

const {printExtension} = require('../test/printer');

const test = extend({
    print: printExtension,
});

test('printer: visitors: exported: visitors', async (t) => {
    const {CallExpression} = await import('./tokenize/expressions/index.js');
    
    t.equal(visitors.CallExpression, CallExpression);
    t.end();
});

test('printer: visitors: exported: maybePlugin', async (t) => {
    const {maybePlugin: _maybePlugin} = await import('./tokenize/maybe/index.js');
    
    t.equal(maybePlugin, _maybePlugin);
    t.end();
});
