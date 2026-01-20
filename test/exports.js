import {test} from 'supertape';

test('printer: exports: is', async (t) => {
    const exported = await import('@putout/printer/is');
    const is = await import('#is');
    
    t.equal(exported, is);
    t.end();
});
