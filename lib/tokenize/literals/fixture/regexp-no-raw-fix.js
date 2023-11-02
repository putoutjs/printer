import {test} from 'supertape';

const {once} = require('events');

test('should return the version', async (t) => {
    const cp = execFile('node', [
        path.resolve(__dirname, '..', pkg.bin.yo),
        '--version',
        '--no-update-notifier',
    ]);
    const expected = pkg.version;
    const [data] = await once(cp.stdout, 'data');
    
    assert.strictEqual(data
        .toString()
        .replace(/\r\n|\n/, ''), expected);
    cb();
    t.end();
});
