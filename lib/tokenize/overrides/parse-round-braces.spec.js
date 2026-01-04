import {test} from 'supertape';
import {parseOverrides} from './overrides.js';
import {
    ROUND_BRACES_ENABLED,
    ROUND_BRACES_DISABLED,
    ROUND_BRACES_DEFAULTS,
} from './parse-round-braces.js';

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

test('printer: overrides: new: enabled', (t) => {
    const {semantics} = parseOverrides({
        semantics: {
            roundBraces: true,
        },
    });
    
    const {roundBraces} = semantics;
    
    t.ok(roundBraces.new);
    t.end();
});

test('printer: overrides: assign, new', (t) => {
    const {semantics} = parseOverrides({
        semantics: {
            roundBraces: {
                assign: true,
            },
        },
    });
    
    const {roundBraces} = semantics;
    
    t.ok(roundBraces.new);
    t.end();
});
