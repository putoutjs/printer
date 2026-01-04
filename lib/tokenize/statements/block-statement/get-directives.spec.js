import {test} from 'supertape';
import {getDirectives} from './get-directives.js';

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
