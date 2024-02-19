'use strict';

const {extend} = require('supertape');
const {
    print,
    visitors,
    maybeVisitor,
} = require('./printer');
const acorn = require('acorn');
const estreeToBabel = require('estree-to-babel');

const {
    parse,
    transform,
    traverse,
    template,
} = require('putout');

const {printExtension} = require('../test/printer');

const test = extend({
    print: printExtension,
});

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
