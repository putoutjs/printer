test('should return the version', (cb) => {
    const cp = execFile('node', [
        path.resolve(__dirname, '..', pkg.bin.yo),
        '--version',
        '--no-update-notifier',
    ]);
    
    const expected = pkg.version;
    
    cp.stdout.on('data', (data) => {
        assert.strictEqual(data
            .toString()
            .replace(/\r\n|\n/g, ''), expected);
        cb();
    });
});
