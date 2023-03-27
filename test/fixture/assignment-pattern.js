for (const currentProcessor of loadedProcessors) {
    const {
        isMatch,
        preProcess = stubPreProcess,
        postProcess = stubPostProcess,
        process = stubProcess,
    } = currentProcessor;
}

module.exports.tokenize = (ast, overrides = {}) => {};