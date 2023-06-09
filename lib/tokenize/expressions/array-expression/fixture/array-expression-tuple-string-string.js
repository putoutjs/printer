export default {
    'fresh': async () => await run(['lint:memory', 'coverage']),
};

run(['lint:memory', 'coverage']);

await run([
    'lint:memory',
    'coverage',
    'hello',
    'world',
    'abc',
]);

run([
    'lint:memory',
    'coverage',
    'hello',
    'world',
    'abc',
]);