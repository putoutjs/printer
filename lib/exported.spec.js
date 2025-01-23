'use strict';

const {createTest} = require('#test');
const {visitors, maybeVisitor} = require('./printer');
const {test} = createTest(__dirname);

test('printer: visitors: exported: visitors', async (t) => {
    const {CallExpression} = await import('./tokenize/expressions/index.js');
    
    t.equal(visitors.CallExpression, CallExpression);
    t.end();
});

test('printer: visitors: exported: maybeVisitor', async (t) => {
    const {maybeVisitor: _maybeVisitor} = await import('./tokenize/maybe/index.js');
    
    t.equal(maybeVisitor, _maybeVisitor);
    t.end();
});
