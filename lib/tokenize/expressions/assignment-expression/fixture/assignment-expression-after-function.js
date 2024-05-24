async function createProcessFactoryAsync() {
    return new ProcessFactory(wasmModule);
}

exports.createProcessFactoryAsync = createProcessFactoryAsync;

class ProcessFactory {
    constructor(wasmModule) {
        this._wasmModule = wasmModule;
    }
}