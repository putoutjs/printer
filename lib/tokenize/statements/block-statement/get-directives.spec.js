'use strict';

const {test} = require('supertape');
const {getDirectives} = require('./get-directives');

test('printer: tokenizer: statement: block: getDirectives for 🐊promises', (t) => {
    const node = {};
    
    const path = {
        node,
        get() {
            return [];
        },
    };
    
    const result = getDirectives(path);
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});

