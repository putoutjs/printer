'use strict';

const {test} = require('supertape');

test('printer: exports: is', (t) => {
    const exported = require('@putout/printer/is');
    const is = require('../lib/tokenize/is');
    
    t.equal(exported, is);
    t.end();
});
