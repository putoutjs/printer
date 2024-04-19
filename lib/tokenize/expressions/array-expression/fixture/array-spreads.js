const a = {
    rule,
    msg,
    options: {
        ...options,
        exclude: [
            ...exclude(),
            ...maybeArray(options.exclude),
        ],
    },
};

function add(names) {
    spawnSync('git', ['add', ...names]);
}