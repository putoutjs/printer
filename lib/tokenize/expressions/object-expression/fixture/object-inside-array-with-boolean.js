const places = putout.findPlaces(ast, fixture.comment, {
    rules: {
        'find/push': [true, {
            ignore: true,
        }],
    },
});

const bools = [
    true,
    true,
    false,
    false,
];