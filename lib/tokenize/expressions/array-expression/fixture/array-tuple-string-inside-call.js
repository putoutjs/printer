function x() {
    const eslint = stub().returns(['', [{
        message: 'Missing semicolon.',
        position: {
            column: 58,
            line: 2,
        },
        rule: 'semi (eslint)',
    }]]);
}