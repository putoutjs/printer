[...a];
module.exports = [
    ...safeAlign, {
        files: ['*.js'],
    }, {
        files: ['./packages/putout'],
    },
    ...matchToFlatDir('./packages/putout'),
];