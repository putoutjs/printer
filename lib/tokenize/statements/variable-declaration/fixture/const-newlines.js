const findUp = stub();

const isChanged = reRequire('./is-changed');
const result = await isChanged(fileCache, {
    findUp,
});

test('operate: extract: RegExpLiteral', (t) => {
    const pattern = 'hello';
    const node = {
        type: 'RegExpLiteral',
        pattern,
    };
});