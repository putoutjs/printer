'use strict';

const montag = require('montag');

const tryCatch = require('try-catch');
const {extend} = require('supertape');
const {
    print,
    visitors,
    maybePlugin,
} = require('./printer');
const acorn = require('acorn');
const estreeToBabel = require('estree-to-babel');

const {
    parse,
    transform,
    traverse,
    template,
} = require('putout');

const {readFixtures} = require('../test/fixture');
const {printExtension} = require('../test/printer');
const fixture = readFixtures(__dirname);

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
