'use strict';

const {createTest} = require('#test');
const {parseOverrides} = require('./overrides');
const {test} = createTest(__dirname);

test('printer: overrides: defaults: escapeSingle', (t) => {
    const {semantics} = parseOverrides();
    
    t.ok(semantics.escapeSingleQuote);
    t.end();
});

test('printer: overrides: defaults: no escapeDouble', (t) => {
    const {semantics} = parseOverrides();
    
    t.notOk(semantics.escapeDoubleQuote);
    t.end();
});

test('printer: overrides: double quote: no escape single', (t) => {
    const {semantics} = parseOverrides({
        format: {
            quote: '"',
        },
    });
    
    t.notOk(semantics.escapeSingleQuote);
    t.end();
});

test('printer: overrides: double quote: escape double', (t) => {
    const {semantics} = parseOverrides({
        format: {
            quote: '"',
        },
    });
    
    t.ok(semantics.escapeDoubleQuote);
    t.end();
});
