import {test} from 'supertape';

test('printer: exports: is', async (t) => {
    const exported = await import('@putout/printer/is');
    const is = await import('../lib/tokenize/is.js');
    
    t.equal(exported, is);
    t.end();
});
