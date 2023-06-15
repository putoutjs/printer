const findUp = stub();

const isChanged = reRequire('./is-changed');
const result = await isChanged(fileCache, {
    findUp,
});