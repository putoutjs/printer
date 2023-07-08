module.exports.replace = () => ({
    'const __a = __b': 'const __b = __a',
});

// const hello = world; -> const world = hello;