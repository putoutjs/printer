'use strict';

const {test} = require('supertape');
const {parseOverrides} = require('./overrides');
const {
    ROUND_BRACES_ENABLED,
    ROUND_BRACES_DISABLED,
    ROUND_BRACES_DEFAULTS,
} = require('./parse-round-braces');

test('printer: overrides: roundBraces: enabled', (t) => {
    const {semantics} = parseOverrides({
        semantics: {
            roundBraces: true,
        },
    });
    
    const {roundBraces} = semantics;
    
    t.deepEqual(roundBraces, ROUND_BRACES_ENABLED);
    t.end();
});

test('printer: overrides: roundBraces: disabled', (t) => {
    const {semantics} = parseOverrides({
        semantics: {
            roundBraces: false,
        },
    });
    
    const {roundBraces} = semantics;
    
    t.deepEqual(roundBraces, ROUND_BRACES_DISABLED);
    t.end();
});

test('printer: overrides: roundBraces: default', (t) => {
    const {semantics} = parseOverrides();
    const {roundBraces} = semantics;
    
    t.deepEqual(roundBraces, ROUND_BRACES_DEFAULTS);
    t.end();
});

test('printer: overrides: roundBraces: disabled: partial', (t) => {
    const {semantics} = parseOverrides({
        semantics: {
            roundBraces: {
                assign: false,
            },
        },
    });
    
    const {roundBraces} = semantics;
    const expected = {
        ...ROUND_BRACES_DEFAULTS,
        assign: false,
    };
    
    t.deepEqual(roundBraces, expected);
    t.end();
});
